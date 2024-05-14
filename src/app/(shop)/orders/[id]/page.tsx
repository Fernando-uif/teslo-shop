import { Children } from "react";
import clsx from "clsx";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import { redirect } from "next/navigation";

import { PayPalButton, Title } from "@/components";

import { getOrderById } from "@/actions/order/get-order-by-id";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const { order, ok } = await getOrderById(id);
  if (!ok) {
    redirect("/");
  }

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
                  "bg-red-500": !order?.isPaid,
                  "bg-green-700": order?.isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              <span className="mx-2">
                {order?.isPaid ? "Paid" : "Not paid"}
              </span>
            </div>

            {/* Items */}
            {Children.toArray(
              order?.OrderItem.map((product) => {
                return (
                  <div className="flex mb-5">
                    <Image
                      src={`/products/${product?.product.ProductImage[0]?.url}`}
                      alt={`${product?.product?.title}`}
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
                      <p>{product?.product?.title}</p>
                      <p>
                        ${product?.price} x {product?.quantity}
                      </p>
                      <p className="font-bold">
                        Subtotal: ${product.price * product?.quantity}
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
              <p className="text-xl">
                {order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}
              </p>
              <p>{order?.OrderAddress?.address}</p>
              <p>
                {order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}
              </p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2 ">Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Items</span>
              <span className="text-right">
                {order?.OrderItem?.length} Item(s)
              </span>

              <span>SubTotal</span>
              <span className="text-right">${order?.subTotal}</span>

              <span>Taxes(15%)</span>
              <span className="text-right">${order?.tax}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">${order?.total}</span>
            </div>
            <div className="mt-5 mb-2  w-full">
              <PayPalButton
                amount={order?.total || 0}
                orderId={order?.id || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
