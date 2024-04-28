"use client";

import { Component, ReactNode } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

type NavigationT = {
  name: string,
  href: string,
  current: boolean,
}

const UnAuthNavigation: NavigationT[] = [
  { name: 'Sign Up', href: '/signup', current: false },
  { name: 'Log In', href: '/login', current: false },
];

const AuthNavigation: NavigationT[] = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Create', href: '/create', current: false },
  { name: 'Logout', href: '/auth/logout', current: false },
];


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type props = {
  isAuthed: boolean,
}

export default class Navbar extends Component<props> {
  constructor(props: props) {
    super(props);
  }

  render(): ReactNode {
    return (
      <Disclosure as="nav" className="bg-inherit text-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-1xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-yellow-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Mascot Icon */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <img
                        className="h-14 w-auto items-center"
                        src="/icons/Fin.svg"
                        alt="FinWise"
                      />
                    </Link>
                    <Link href="/" className="px-2 text-3xl font-bold text-yellow-300 hover:text-yellow-200">FinWise</Link>
                  </div>
                </div>
                {/* Buttons */}
                <div className="">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {(this.props.isAuthed ? AuthNavigation : UnAuthNavigation).map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : ' hover:bg-yellow-300 hover:drop-shadow-lg hover:text-black',
                            'rounded-md px-3 py-2 text-lg font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {(this.props.isAuthed ? AuthNavigation : UnAuthNavigation).map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-yellow-300 hover:text-black',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

}
