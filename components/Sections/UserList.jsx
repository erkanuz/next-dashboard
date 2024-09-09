import Link from "next/link";
import { Remove } from "../DeleteButton";
import { HiPencilAlt } from "react-icons/hi";
import { formatDate, getEmailAddress } from "../Helper/helper";
import { AiOutlineUser } from 'react-icons/ai'

const getTopics = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: "no-store",
    });

    if(!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();

    return { topics: data.topics || [] };
  } catch (error) {
    console.log("Error loading topics: ", error);

    return { topics: [] };
  }
};

export const UserList = async () => {
  const { topics } = await getTopics();
  return (
    <>
      <div className="p-5 bg-white grid">

        <div className="overflow-auto h-[70vh] rounded-lg shadow">
          <table className="w-full">

            <thead className="bg-black border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-white text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="p-3 text-white text-sm font-semibold tracking-wide text-left">Email</th>
                <th className="p-3 text-white text-sm font-semibold tracking-wide text-left">Last Order</th>
                <th className="p-3 text-white text-sm font-semibold tracking-wide text-left">Method</th>
                <th className="p-3 text-white text-sm font-semibold tracking-wide text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {topics.map((t) => (
                <tr>
                  <td className='flex items-center p-1.5'>
                    <span className='bg-green-300 p-3 rounded-lg'>
                      <AiOutlineUser color='white' />
                    </span>
                    <p className="p-3 text-sm text-gray-700 whitespace-nowrap">{t.customer_name}</p>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{getEmailAddress(t.customer_name)}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{formatDate(t.order_date)}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{t.payment_method}</td>

                  <td className="flex gap-2 p-3">
                    <Remove id={t._id} />
                    <Link href={`/edit/${t._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </>
  );
}