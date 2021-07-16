import Loading from "components/Loading";
import StatusShow from "components/StatusShow";
import React, { useEffect, useState } from "react";
// import SaleService from "services/SaleService";

var myHeaders = new Headers();
myHeaders.append("email", "example2@gmail.com");
myHeaders.append("secret", "password2");

export default function Status() {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const consultaAPI = async () => {
      fetch("http://localhost:3001/api/status", {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
})
        .then((response) => response.json())
        .then((result) => {
          setStatus(result.data.notification.status)
          setMessage(result.data.notification.message)
          setLoading(true)
        })
        .catch((error) => console.log("error", error));
    };
    consultaAPI();
  }, []);

    return (loading ? <StatusShow status={status} message={message} /> : <Loading />)
}
