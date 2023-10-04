export const ContactPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Get in touch</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <p className="text-gray-900">
            Please note that we are an all-volunteer organization. It is our
            goal to respond to messages received from the public as timely as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
          <div className="rounded-2xl bg-white/25 p-8">
            <h3 className="text-base font-semibold leading-7 text-brown-900">
              Mailing Address
            </h3>
            <address className="mt-3 text-sm not-italic leading-6 text-gray-900">
              <p>Paw Prints Animal Rescue</p>
              <p>P.O. Box 1472</p>
              <p>Garner, NC 27529</p>
            </address>
          </div>

          <div className="rounded-2xl bg-white/25 p-8">
            <h3 className="text-base font-semibold leading-7 text-brown-900">
              Telephone
            </h3>
            <dl className="mt-3 text-sm leading-6 text-gray-900">
              <div className="mt-1">
                <dt className="sr-only">Phone number</dt>
                <dd>
                  <p>
                    <a
                      href="tel:9197729107"
                      className="font-semibold hover:underline"
                    >
                      (919) 772-9107
                    </a>
                  </p>
                  <p>Option 1: General Message</p>
                  <p>Option 2: Cats & Kittens</p>
                  <p>Option 3: Dogs & Puppies</p>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-white/25 p-8">
            <h3 className="text-base font-semibold leading-7 text-brown-900">
              Email
            </h3>
            <dl className="mt-3 text-sm leading-6 text-gray-900">
              <div className="mt-1">
                <dt className="sr-only">Email addresses</dt>
                <dd>
                  <p>
                    <a
                      className="font-semibold hover:underline"
                      href="mailto:info@pawprintsrescue.org"
                    >
                      info@pawprintsrescue.org
                    </a>
                  </p>
                  <p>
                    <a
                      className="font-semibold hover:underline"
                      href="mailto:dogs@pawprintsrescue.org"
                    >
                      dogs@pawprintsrescue.org
                    </a>
                  </p>
                  <p>
                    <a
                      className="font-semibold hover:underline"
                      href="mailto:cats@pawprintsrescue.org"
                    >
                      cats@pawprintsrescue.org
                    </a>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
