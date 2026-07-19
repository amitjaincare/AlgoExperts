const API_URL = "https://algoexperts.onrender.com";

const form = document.getElementById("leadForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        market: document.getElementById("market").value,
        experience: document.getElementById("experience").value,
        message: document.getElementById("message").value
    };

    if(data.mobile.length != 10){
        alert("Enter valid mobile number");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/lead`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (response.ok) {

            alert("✅ Thank you! Your request has been submitted.");

            form.reset();

        } else {

            alert("Something went wrong.");

        }

    } catch (error) {

        console.error(error);

        alert("Server not reachable.");

    }

});