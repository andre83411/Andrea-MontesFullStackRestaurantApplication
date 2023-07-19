import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";

const GET_ORDER_HISTORY = gql`
  query GetOrderHistory($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        attributes {
          username
          orders {
            data {
              id
              attributes {
                dishes
                amount
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

const Profile = () => {
  const { user } = useAppContext();
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch order history using Apollo Client
  const { loading, error, data, refetch } = useQuery(GET_ORDER_HISTORY, {
    variables: { id: user ? user.id : null },
  });

  useEffect(() => {
    if (user && data) {
      refetch();
    }
  }, [user, data, refetch]);

  // Function to format the createdAt timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} (UTC)`;
  };

  useEffect(() => {
    if (data && data.usersPermissionsUser && data.usersPermissionsUser.data) {
      const ordersData = data.usersPermissionsUser.data.attributes.orders.data;
      const parsedOrders = ordersData.map((order) => ({
        id: order.id,
        amount: centsToDollars(order.attributes.amount),
        createdAt: formatTimestamp(order.attributes.createdAt),
        dishes: order.attributes.dishes,
      }));
      setOrderHistory(parsedOrders);
    }
  }, [data]);

  return (
    <div className="w-full w-full font-mono">
      <div className="h-full bg-gray-100 rounded-2xl">
        <div>
          <div className="gap-10">
            <div className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 focus:ring-4 focus:ring-gray-600 rounded-lg">
                {user ? `Hello 👋 ${user.username}` : ""}
            </div>
            <div className="w-full">
              {/* Display order history */}
              {data ? ( 
                !loading && orderHistory.length > 0 ?(
                <div className="">
                  <h6 className="mb-2 text-sky-700 text-muted text-1xl text-center m-8">Your Order History:</h6>
                  <div className="m-4 bg-white rounded-lg">
                  <ul>
                    {orderHistory.map((order) => (
                      <li key={order.id}>
                        <div className="px-4 py-2 grid-rows-1 mx-1.5 my-1.5 text-xs">
                        <div className="text-left">Date: {order.createdAt}</div>
                        <div className="text-left">ID: {order.id}</div>
                        </div>
                        <ul>
                          {order.dishes.map((dish) => (
                            <li key={dish.id}>
                              <div className="px-4 py-2 text-xl">
                                <div>Dish: {dish.attributes.name}</div>
                                <div>Qty: {dish.quantity}</div>
                                <div>Price: ${centsToDollars(dish.attributes.price)}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 text-xl text-right">Total: ${order.amount}</div>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-fuchsia-400 via-fuchsia-200 to-fuchsia-50 mx-8 my-8">
                  <p className="mb-2 text-muted text-lg">No order history available.</p>
                </div>
              )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
