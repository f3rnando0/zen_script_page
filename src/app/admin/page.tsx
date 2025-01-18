"use client";

import { USD } from "@/lib";
import axios from "axios";
import { useEffect, useState } from "react"

interface IAdminData {
  views: number;
  downloads: number;
  orders: number;
}

export default function Admin() {
  const [isAuthed, setAuth] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false)
  const [data, setData] = useState<IAdminData | undefined>();

  useEffect(() => {
    if (isAuthed) {
      fetchData();
    }
  }, [isAuthed])

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/data", {
        headers: {
          "X-Admin-Password": key
        }
      });

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function authenticate() {
    try {
      const response = await axios.post("/api/auth", JSON.stringify({ key }));

      if (response.status === 200) {
        setAuth(true);
      }
    } catch {
      setError(true);
    }
  }

  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value !== "") {
      setKey(e.target.value);
    }
  }

  if (!isAuthed) {
    return (
      <div className="w-full h-screen flex flex-row justify-center items-center">
        <div className="w-[420px]">
          <p className="text-white font-bold">Admin Panel</p>
          <div className="p-4 border border-neutral-600 bg-cyan-800 flex flex-col gap-2 rounded-lg">
            <input type="text" placeholder="Key" className="p-2 rounded-md outline-none" onChange={handleKey} />
            <button type="submit" className="bg-white text-sm p-1 rounded-md border font-bold hover:brightness-90 transition-all duration-200" onClick={authenticate}>Login</button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <p className="text-white font-bold text-xl">Admin Panel</p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-neutral-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Version
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Views
              </th>
              <th scope="col" className="px-6 py-3">
                Total Orders
              </th>
              <th scope="col" className="px-6 py-3">
                Total Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Total Downloads
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                OMEGA Lazer - BO6 Script
              </th>
              <td className="px-6 py-4">
                V1
              </td>
              <td className="px-6 py-4">
                {USD.format(50)}
              </td>
              <td className="px-6 py-4">
                {data?.views ?? "0"}
              </td>
              <td className="px-6 py-4">
                {data?.orders ?? "0"}
              </td>
              <td className="px-6 py-4">
                {USD.format(data?.orders ?? 0 * 50)}
              </td>
              <td className="px-6 py-4">
                {data?.downloads ?? "0"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}