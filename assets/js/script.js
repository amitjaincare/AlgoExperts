const API_URL = "https://algoexperts-1.onrender.com";


const form = document.getElementById("leadForm");


form.addEventListener("submit", async function (e) {

    e.preventDefault();


    const data = {

        name: document.getElementById("name").value,

        phone: document.getElementById("mobile").value,

        email: document.getElementById("email").value,

        city: document.getElementById("city").value,

        market: document.getElementById("market").value,

        experience: document.getElementById("experience").value,

        message: document.getElementById("message").value

    };


    // Mobile validation

    if (data.phone.length !== 10) {

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


            alert("✅ Thank you! Your request has been submitted successfully.");


            form.reset();



        } else {


            const errorText = await response.text();


            console.log("Server Error:", errorText);


            alert("❌ Something went wrong. Please try again.");


        }



    } catch (error) {


        console.error("Connection Error:", error);


        alert("❌ Server not reachable. Please try again later.");


    }



});