"use client";

import React, { useState, useEffect, useMemo } from "react";

export default function App() {

    const [query, setQuery] = useState("")
    const [userInfo, setUserInfo] = useState([]);

    const [name, setName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if (localStorage.getItem("userData")) {
            const storedData = JSON.parse(localStorage.getItem("userData"));
            setUserInfo(storedData);
        }
    }, [])


    const addUser = (e) => {
        e.preventDefault();

        const user = { name, countryCode, email, password }

        setUserInfo([...userInfo, user]);
        localStorage.setItem("userData", JSON.stringify([...userInfo, user]));
        
        setName("");
        setCountryCode("");
        setEmail("");
        setPassword("");
    };


    const handleClear = () => {
        setUserInfo([]);
        localStorage.removeItem("userData");
    }


    const filteredItems = useMemo(() => {
        if (!query) {
            const sortedUserInfo = userInfo.sort((a, b) => a.email.localeCompare(b.email));
            return sortedUserInfo
        }
        return userInfo.filter(names => {
            return names.name.toLowerCase().includes(query.toLowerCase())
        })

    }, [userInfo, query])


    return (
        <div className="mx-auto grid grid-cols-12 gap-4 bg-zinc-50 p-1">

        <div className="header col-span-12 rounded-lg border border-gray-300 py-4">
            <h3 className="text-center text-3xl">User Form</h3>
        </div>

        <div className="col-span-12 rounded-lg border border-gray-500 bg-gray-200 p-5 md:col-span-5 md:m-3 m-0">
            <div className="flex justify-center align-center flex-col">

                <h1 className="mx-auto text-2xl">User Form</h1>

                    {/* User form */}
                <form onSubmit={addUser} className="my-4 w-full mx-auto max-w-lg">
                    <input
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Name"
                        className="my-2 text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        name="countryCode"
                        type="text"
                        value={countryCode}
                        placeholder="Country Code"
                        className="my-2 text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none"
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                    />
                    <input
                        name="email"
                        type="text"
                        value={email}
                        placeholder="Email"
                        className="my-2 text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        name="password"
                        autoComplete="on"
                        type="password"
                        value={password}
                        placeholder="Password"
                        className="my-2 text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="bg-blue-800 rounded text-md block px-3 py-2 rounded-lg w-full text-white border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none" type="submit"> Submit </button>
                </form>
            </div>
        </div>

            
            
        {/* Table component */}
        <div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-5 md:col-span-7 md:m-3 m-0">

            <div className="flex justify-center align-center flex-col">

                <h1 className="mx-auto text-2xl">User Table</h1>

                    {/* Search Input */}
                <div className="w-full items-center">
                    <input
                        className="text-md block px-3 py-2 rounded w-full border-2 border-gray-300 shadow-md focus:border-gray-600 focus:outline-none my-4"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        type="search"
                        placeholder="Search user name..."
                    />
                </div>

                    {/* Table (data) */}
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">

                                {filteredItems.length ?
                                    <p>{filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}</p>
                                    : ""
                                }

                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Country Code</th>
                                            <th scope="col" className="px-6 py-4">Name</th>
                                            <th scope="col" className="px-6 py-4">Email</th>
                                            <th scope="col" className="px-6 py-4">Password</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map((data, index) => (
                                            <tr className="border-b dark:border-neutral-500" key={index}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{data.countryCode}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{data.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{data.password}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                    {/* Clear button */}
                <div className="flex justify-center align-center">
                    {!userInfo.length ? null : (
                        <div>
                            <button className="bg-blue-800 rounded text-md block px-3 py-2 text-white border-2 border-gray-300 focus:border-gray-600" onClick={() => handleClear()}>
                                Clear
                            </button>
                        </div>
                    )}
                    </div>
                    
            </div>
        </div>

    </div>
    );
}