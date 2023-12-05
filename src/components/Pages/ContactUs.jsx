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
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="max-w-full p-4 bg-white rounded-md shadow-md outline-1 mb-4"
      >
        <label className="block mb-2 font-bold">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold">
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold">
          Phone no.
          <input
            type="number"
            id="phoneno"
            name="phoneno"
            value={phone}
            onChange={(e) => setPhoneno(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className=" w-full  bg-black text-base px-3 py-2 text-white rounded-lg flex-row  hover:bg-slate-700  "
          >
            Submit
          </button>
        </label>
      </form>
    </div>
  );
}
export default Contact;
