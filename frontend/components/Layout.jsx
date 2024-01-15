import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import Cookie from "js-cookie";
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

import Head from "next/head";
import Link from "next/link";


function Navigation() {
  const { user, setUser, cart } = useAppContext();
  const router = useRouter();

  function handleLogout() {
    setUser(null);
    Cookie.remove("token");
    router.push("/");
  }

  const isLoggedIn = !!user;
  const hasItemsInCart = cart.items.length > 0;

  return (
    <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
      <div className="flex justify-between items-center w-full mx-16">
        <div className="xl:w-1/3">
          <Link href="/" passHref legacyBehavior>
            <a>
              {/* eslint-disable @next/next/no-img-element */}
              <img
                className="m-3"
                src="/icon.png"
                width={75}
                height={15}
                alt="food Logo"
              />
            </a>
          </Link>
        </div>

        <div className="xl:block xl:w-1/3">
          <div className="flex items-center justify-end">
            <Link className="text-gray-500 hover:text-cyan-800 font-bold" href="/">
              Home
            </Link>

            <div className="hxl:block">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <span className="inline-block py-2 px-4 mr-2 leading-5 text-gray-500 hover:text-cyan-800 bg-transparent font-bold rounded-md">
                    {user.username}
                  </span>
                  <Link href="/profile" legacyBehavior>
                      <a className="text-gray-500 hover:text-cyan-800 font-bold ml-4 mr-2">
                        Profile
                      </a>
                  </Link>

                  {/* "Checkout" link logic */}
                  {hasItemsInCart && (
                    <Link href="/checkout" legacyBehavior>
                      <a className="text-gray-500 hover:text-cyan-800 font-bold ml-4 mr-2">
                        Checkout
                      </a>
                    </Link>
                  )}

                  <button
                    className="inline-block py-2 px-4 text-sm leading-5 text-white bg-teal-400 hover:bg-teal-300 font-medium focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50 rounded-md"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link
                    className="inline-block py-2 px-4 mr-2 leading-5 text-gray-500 hover:text-cyan-700 font-bold bg-transparent rounded-md"
                    href="/login"
                  >
                    Log In
                  </Link>
                  <Link
                    className="inline-block py-2 px-4 text-sm leading-5 text-teal-50 bg-teal-600 hover:bg-teal-700 font-medium focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 rounded-md"
                    href="/register"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Layout(props) {
  const title = "Welcome to Next JS";

  return (
    <div>
      <Head>
        <title>Order Food</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <div className="text-2xl font-medium">{props.children}</div>
    </div>
  );
}