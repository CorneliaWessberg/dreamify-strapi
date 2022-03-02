import React from "react";

function Profile() {
  //Hämtar user information ifrån localStorage
  const username = localStorage.getItem("username").replace(/"/g, "");
  const email = localStorage.getItem("userEmail").replace(/"/g, "");
  const userId = localStorage.getItem("userId").replace(/"/g, "");

  return (
    <>
      <div class="dashboard">
        <h1 class="profile">Profile information</h1>
        <p>Username: {username} </p>
        <p>E-mail: {email}</p>
        <p>UserID: {userId}</p>
      </div>
    </>
  );
}

export default Profile;
