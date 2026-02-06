import React, { ReactNode } from 'react'
import { IoMdClose } from "react-icons/io";

interface ModelInter {
    isOpen: boolean
    isVisible: boolean
    closeModal: () => void
    children: ReactNode
    width?: string
}

const Model = ({ isOpen, isVisible, closeModal, children, width }: ModelInter) => {
    return (
        <>
            {isOpen && (
                <div
                    className={`fixed inset-0 z-50 grid place-items-center bg-background-2/60 backdrop-blur-sm transition-opacity duration-300 
            ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                    <div
                        className={`relative m-2 p-2 lg:m-4 lg:p-4 rounded-lg border-base-800 xl:border-base-700 bg-base-800 shadow-sm transform transition-all duration-300 no-scrollbar
              ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-28 scale-90"}
              max-h-[70vh] overflow-y-auto
              ${width ?? "sm:w-[95%] md:w-[10%] lg:w-[10%] xl:w-[10%]"}
            `}
                    >
                        <div className="flex justify-end">
                            <IoMdClose
                                className="cursor-pointer body-txtColor-1 text-2xl"
                                onClick={closeModal}
                            />
                        </div>

                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
export default Model
