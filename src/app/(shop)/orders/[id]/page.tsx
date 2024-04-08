import { Children } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { IoCartOutline } from "react-icons/io5";
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  // TODO Verificar
  // Redirect para sacar de la pantall

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pending</span> */}

              <span className="mx-2">Paid</span>
            </div>

            {/* Items */}
            {Children.toArray(
              productsInCart.map((product) => {
                return (
                  <div key={product.slug} className="flex mb-5">
                    <Image
                      src={`/products/${product.images[0]}`}
                      alt={`${product.title}`}
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "100px",
                        aspectRatio: "1/1",
                      }}
                      className="mr-5"
                    />
                    <div>
                      <p>{product.title}</p>
                      <p>${product.price} x 3</p>
                      <p className="font-bold">
                        Subtotal: ${product.price * 3}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Checkout  order resume*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Address to send</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando sosa</p>
              <p>Av. nombre </p>
              <p>municipality: Huixquilucan</p>
              <p>Col Center</p>
              <p>Mexico city</p>
              <p>CP 52744</p>
              <p>552233322</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2 ">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Items</span>
              <span className="text-right">3 Items</span>

              <span>SubTotal</span>
              <span className="text-right">$100</span>

              <span>Taxes(15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>
            </div>
            <div className="mt-5 mb-2  w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/* <span className="mx-2">Pending</span> */}

                <span className="mx-2">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
