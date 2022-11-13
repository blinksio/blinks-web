import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { BlinkNode } from "../interfaces/blink";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  data: Partial<BlinkNode>;
  closeModal: Function;
};

export default function BlinkModal({ isOpen, closeModal, data }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="absolute top-5 left-5 w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-slate-200 text-center"
                >
                  {data.name}
                </Dialog.Title>
                <div className="mt-2">
                  {data.image_url && (
                    <Image
                      src={data.image_url}
                      alt={`${data.name} logo`}
                      width={50}
                      height={10}
                      className="absolute top-3 right-3 rounded-full"
                    />
                  )}
                  <div className="flex flex-row justify-center marker:px-4 py-2 border-none">
                    <a
                      href={data?.meta?.etherscan_url as string || (data.address ? `https://etherscan.io/address/${data.address}` : "")}
                      className="mx-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                      src={"/etherscan-logo-light-circle.svg"}
                      alt="Etherscan Logo"
                      width={30}
                      height={10}
                      />
                    </a>
                    <a
                      href={data?.meta?.opensea_url as string || (data.address ? `https://opensea.io/assets/ethereum/${data.address}/1` : "")}
                      className="mx-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                      src={"/opensea.svg"}
                      alt="Opensea Logo"
                      width={30}
                      height={10}
                      />
                    </a>
                  </div>
                </div>

                <div className="flex flex-row justify-center mt-4">
                  <Link
                    href={`/address/${encodeURIComponent(
                      data.address as string
                    )}`}
                    className="rounded-md border border-transparent bg-blue-100 mx-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Blink it
                  </Link>
                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-blue-100 mx-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
