import { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { centsToDollars } from "@/utils/centsToDollars";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import Cart from "@/components/Cart"

import Image from "next/image";
import Loader from '@/components/Loader';

import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Row,
} from 'reactstrap';

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function DishCard({ data, query }) {
  const { addItem, setShowCart } = useAppContext();

  function handleAddItem() {
    addItem(data);
    setShowCart(true);
  }

  const showDish = query === "" || 
    data.attributes.name.toLowerCase().includes(query.toLowerCase()) ||
    data.attributes.description.toLowerCase().includes(query.toLowerCase());

  if (!showDish) return null;  

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-gray-100 rounded-2xl">
              <Card style={{ margin: '0 10px' }}>
                <CardImg
                  className="w-full rounded-2xl"
                  top
                  src={`${
                    data.attributes.image.data.attributes
                      .url
                  }`}
                  alt="Dish Image" 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="p-8">
                <CardBody>
                  <div className="group inline-block mb-4" href="#">
                  <CardTitle className="font-heading text-xl text-gray-900 
                    hover:text-gray-700 group-hover:underline font-black">
                    {data.attributes.name}
                    <h2>${centsToDollars(data.attributes.price)}</h2>
                  </CardTitle>
                  </div>
                  <CardText className="text-sm text-gray-500 font-bold">
                    {data.attributes.description}
                  </CardText>
                </CardBody>
                </div>

                <div className="flex flex-wrap md:justify-center -m-2">
                  <div className="w-full md:w-auto p-2 my-6">
                  <Button
                    className="block w-full px-12 py-3.5 
                    text-lg text-center text-white 
                    font-bold bg-gray-900 
                    hover:bg-gray-800 focus:ring-4 
                    focus:ring-gray-600 rounded-full"
                    onClick={handleAddItem}
                  >
                    + Add To Cart
                  </Button>
                  </div>
                </div>
              </Card>
      </div>
    </div>
  );
}

export default function Restaurant() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  const [query, setQuery] = useState("");

  if (error) return "Error Loading Dishes";
  if (loading) return <Loader />;
  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data;

    return (
      <>
      <div className='py-6'>
        <Cart/>
        <div className='py-6 px-8'>
        <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-cyan-800 py-2">
        {restaurant.data.attributes.name}
        </h1>
        <div>
        <input
            className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            type="text"
            placeholder="Search Dishes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        </div>
        <div className="py-16 px-8 bg-white rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {restaurant.data.attributes.dishes.data.map((res) => {
                return <DishCard query={query} key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}