import charitiesLogo from '../assets/charities-logo.png';
import petSmartLogo from '../assets/petsmart.png';

export const SupportPage = () => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-brown-900">Support us</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 2xl:col-span-6">
          <p className="mb-2">
            There are many ways you can help us help the animals. The
            contribution of your time and/or money can go a long way at helping
            us reduce the population of stray and owned cats and dogs in our
            community. Here are just a few ways that you can help:
          </p>
          <ul className="mb-8 list-disc pl-4">
            <li>
              Become a foster home for pets in our Rescue and Adoption Program
            </li>
            <li>
              Become a caretaker (feeder and/or trapper) with our Feral Cat
              Management Program
            </li>
            <li>
              Donate money to help cover the cost of providing veterinary care
              to the animals in our programs. Oftentimes, one animal facing a
              serious illness can seriously drain our resources
            </li>
            <li>
              Donate food (or money to purchase food) for feral cat colonies
            </li>
            <li>
              Donate materials and/or labor to build feeding stations and
              shelters for feral cats
            </li>
            <li>
              Volunteer at adoption events or help clean cages and play with
              cats and kittens when they are in the PetSmart Adoption Centers
            </li>
            <li>
              Professionals can offer reduced or pro bono legal or accounting
              assistance
            </li>
            <li>
              Business owners can donate goods or services for raffles and other
              fundraising efforts
            </li>
            <li>
              Civic and social groups can hold fundraisers for the benefit of
              PPAR animals
            </li>
          </ul>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/25 p-4">
            <p>We accept payments and donations through PayPal</p>
            <div>
              <input
                type="image"
                src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif"
                name="submit"
                alt="PayPal - The safer, easier way to pay online!"
              />
              <img
                alt=""
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </div>
            <p>You may also mail a tax-deductible donation to:</p>
            <address>
              <p>Paw Prints Animal Rescue, Inc.</p>
              <p>P.O. Box 1472, Garner, NC 27529</p>
            </address>
            <p>
              ...or email us at{' '}
              <a
                href="mailto:info@pawprintsrescue.org"
                className="font-semibold hover:underline"
              >
                info@pawprintsrescue.org
              </a>
            </p>
            <p>We are a 501(c)(3) charitable organization.</p>
          </div>

          <p className="text-xs">
            Financial information about this organization and a copy of its
            license are available from the North Carolina State Solicitation
            Licensing Branch at{' '}
            <a href="tel:9198072214" className="font-semibold hover:underline">
              (919) 807-2214
            </a>
            . The license is not an endorsement by the State.
          </p>
        </div>

        <div className="lg:col-span-4 2xl:col-span-6">
          <div className="mb-8 rounded-2xl bg-white/25 p-8">
            <h3 className="text-base font-semibold leading-7 text-brown-900">
              Our Supporters
            </h3>
            <div className="mt-3 flex items-center gap-4 lg:justify-between lg:gap-0 2xl:justify-normal 2xl:gap-8">
              <img src={charitiesLogo} alt="PetSmart Charities" />
              <img src={petSmartLogo} alt="PetSmart" />
            </div>
            <address className="mt-3 text-sm not-italic leading-6">
              <p>Saving Lives Spay/Neuter Clinic @ SPCA</p>
              <p>200 Petfinder Lane</p>
              <p>Raleigh, NC 27603</p>
              <p>
                <a
                  href="tel:9197722326"
                  className="font-semibold hover:underline"
                >
                  (919) 772-2326
                </a>
              </p>
            </address>
            <address className="mt-3 text-sm not-italic leading-6">
              <p>Peak City Veterinary Hospital</p>
              <p>1480 Chapel Ridge Road, Suite 130</p>
              <p>Apex, NC 27502</p>
              <p>
                <a
                  href="tel:9194464460"
                  className="font-semibold hover:underline"
                >
                  (919) 446-4460
                </a>
              </p>
            </address>
            <address className="mt-3 text-sm not-italic leading-6">
              <p>Lake Pine Animal Hospital</p>
              <p>1200 Old Raleigh Road</p>
              <p>Apex, NC 27523</p>
              <p>
                <a
                  href="tel:9193801157"
                  className="font-semibold hover:underline"
                >
                  (919) 380-1157
                </a>
              </p>
            </address>
            <address className="mt-3 text-sm not-italic leading-6">
              <p>Crossroads Veterinary Hospital</p>
              <p>1112 Jones Franklin Road</p>
              <p>Raleigh, NC 27606</p>
              <p>
                <a
                  href="tel:9198518979"
                  className="font-semibold hover:underline"
                >
                  (919) 851-8979
                </a>
              </p>
            </address>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/25 p-4">
            <p>Option to pay adoption fee via PayPal</p>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              className="flex w-full max-w-xs flex-col items-center justify-center gap-4"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="MY7WVEKTU7GMA"
              />

              <div className="w-full">
                <input type="hidden" name="on0" value="Adoption Fees" />
                <label
                  htmlFor="os0"
                  className="block text-sm font-medium leading-6"
                >
                  Adoption Fee
                </label>
                <select
                  name="os0"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-600 sm:text-sm sm:leading-6"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Please select an amount
                  </option>
                  <option value="Dog or Puppy">Dog or Puppy $206.00 USD</option>
                  <option value="2 Dogs or Puppies">
                    2 Dogs or Puppies $360.00 USD
                  </option>
                  <option value="Senior Dog">Senior Dog $103.00 USD</option>
                  <option value="Single Kitten">
                    Single Kitten $129.00 USD
                  </option>
                  <option value="2 Kittens">2 Kittens $221.00 USD</option>
                  <option value="Adult Cat">Adult Cat $103.00 USD</option>
                  <option value="2 Adult Cats">2 Adult Cats $179.00 USD</option>
                </select>
              </div>

              <div className="w-full">
                <input type="hidden" name="on1" value="Pet's Name" />
                <label
                  htmlFor="os1"
                  className="block text-sm font-medium leading-6"
                >
                  Pet&apos;s Name
                </label>
                <input
                  type="text"
                  name="os1"
                  maxLength={200}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-600 sm:text-sm sm:leading-6"
                />
              </div>

              <input type="hidden" name="currency_code" value="USD" />
              <button type="submit" name="submit">
                <img
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                  alt="PayPal - The safer, easier way to pay online!"
                />
              </button>
              <img
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                alt=""
                width="1"
                height="1"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
