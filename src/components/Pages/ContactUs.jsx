import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneno] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const details = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const response = await fetch(
        "https://contact-us-b856a-default-rtdb.asia-southeast1.firebasedatabase.app/data.json",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      console.log("Data posted successfully");

      // Clear the input fields after successful submission
      setName("");
      setEmail("");
      setPhoneno("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }; // Add an empty dependency array to ensure this function is memoized correctly
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Phone no.
          <input
            type="number"
            id="phoneno"
            name="phoneno"
            value={phone}
            onChange={(e) => setPhoneno(e.target.value)}
          />
          <button type="submit">Submit</button>
        </label>
      </form>
    </div>
  );
}
export default Contact;
