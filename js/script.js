document.addEventListener("DOMContentLoaded", () => {
  // Show routes that can be taken

  let pickUp = document.querySelector(".pick-btn");

  function renderRoutes(route) {
    let card = document.createElement("li");
    card.className = "card8";
    card.innerHTML = ` 
        <div class = "content-time">
        <h2>${route.shape}</h2>
        <p id = "route-time">${route.departure_time}<p>
        <div id = "btn-wrapper">
         <button id = "dep-time-btn">
        Select
        </button>
        </div>
       
        </div>
        `;
    document.querySelector("#route-list-content").appendChild(card);
  }
  function getRouteData() {
    let url = "http://localhost:3000/stop_times";
    fetch(url)
      .then((res) => res.json())
      .then((stop_times) => stop_times.forEach((route) => renderRoutes(route)));
  }

  pickUp.addEventListener("click", () => {
    getRouteData();
  });

  // Show the bus taken
  document.querySelector("#dep-time-btn").addEventListener("click", () => {
    // console.log(`You have picked${bus.shape} that leaves at ${bus.departure_time}`)
    fetch("http://localhost:3000/stop_times")
      .then((res) => res.json())
      .then((dep) =>
        alert(
          `You have picked${dep.shape} that leaves at ${dep.departure_time}`
        )
      );
  });

  // Data entry

  let userForm = document.querySelector("form");
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = event.target["user-name"].value;
    const userComment = event.target["user-comment"].value;
    console.log(fullName);

    // user object
    const userInfo = {
      userName: fullName,
      userRemark: userComment,
    };

    let userResponse = document.createElement("li");
    userResponse.className = "userCard";
    userResponse.innerHTML = `
    <div class="row-card">
  <div class="column-card">
    <div class="userCard">
      <h3>${fullName}</h3>
      <p>${userComment}</p>
    </div>
  </div>
  </div>
    `;
    document.querySelector(".comment-section").appendChild(userResponse);
    postUserData(userInfo);
    userForm.reset();
  });
});

// Data post
function postUserData(userInfo) {
  // New users
  let post_url = "http://localhost:3000/users";

  fetch(post_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((resp) => resp.json())
    .then((data) => alert(`${data.userName},Thank you for your feedback`));
}
