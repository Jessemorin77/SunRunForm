"use client";
//import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import Image from 'next/image';

export function CreatePost() {
 // const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [monthlyUsage, setMonthlyUsage] = useState("");
  const [confirmation, setConfirmation] = useState(""); // State to handle the confirmation message

  const createUser = api.post2.create.useMutation({
    onSuccess: () => {
      // Handle success, show confirmation and reset form or navigate away
      setConfirmation("Your information has been submitted successfully!");
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
      setMonthlyUsage("");
      // Optionally, navigate the user to another page or perform another action
      // router.push('/success-page'); // Example redirect
    },
    onError: () => {
      // Handle error, show error message
      setConfirmation("An error occurred. Please try again.");
    },
  });

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Solar Qualification Form</h2>
      {confirmation && (
        <div
          className={`p-4 mb-4 text-sm ${createUser.isError ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'} rounded-lg`}
          role="alert"
        >
          {confirmation}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmation(""); // Reset confirmation message before submitting
          createUser.mutate({
            firstName,
            lastName,
            address,
            phoneNumber,
            email,
            usageSummary: monthlyUsage,
          });
        }}
        className="grid grid-cols-1 gap-6"
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        
        {/* Monthly Usage Instruction and Input */}
        <div>
          <label htmlFor="monthlyUsage" className="block mb-2 text-sm font-medium text-gray-900">
            Monthly Electricity Usage (in kWh):
          </label>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
            <Image
              src="/Electric bill picture.png" // Replace with the correct public path to your image
              alt="Highlighted section of an electricity bill showing monthly kWh usage"
              width={640}
              height={641}
              layout="responsive"
            />
          </div>
          <p className="text-sm mb-2 text-gray-600">
            Look for the &quot;Monthly kWh Use&quot; section in the image above. It&apos;s usually in the form of a table with monthly consumption figures. Enter the latest month&apos;s kWh usage in the field below.
          </p>

          <input
            type="number" // Changed to 'number' for better input control
            id="monthlyUsage"
            placeholder="Enter your monthly kWh usage"
            value={monthlyUsage}
            onChange={(e) => setMonthlyUsage(e.target.value)}
            className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={createUser.isLoading}
        >
          {createUser.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


