import facebookIcon from '../assets/facebook-icon.png';
import twitterIcon from '../assets/twitter-icon.png';
import youtubeIcon from '../assets/youtube-icon.png';

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Paw Prints Animal Rescue
      </h1>

      <div className="grid grid-cols-12 gap-8">
        <div className="space-y-2 col-span-12 lg:col-span-6">
          <h2 className="text-2xl font-bold">
            Come see our adorable, adoptable cats and kittens
          </h2>
          <p>
            We have cats in the Adoption Center at the Apex PetSmart (1031
            Beaver Creek Commons Dr.).
          </p>
          <p>
            We also have cats in the Adoption Center at the Morrisville PetSmart
            (3101 Market Center Drive).
          </p>
          <p>
            <a
              href="https://service.sheltermanager.com/asmservice?account=tc1867&method=online_form_html&formid=26"
              className="font-semibold hover:underline"
            >
              Click here
            </a>{' '}
            to fill out an adoption application. Completing an application does
            not obligate you to adopt.
            <br />
            After you have been pre-approved, we will call you to arrange a
            meeting with your furry friend.
          </p>
          {/* <p>
            Paw Prints Animal Rescue is a non-profit animal rescue organization
            dedicated to the rescue, rehabilitation, and adoption of dogs and
            cats. Since 2005, we have placed over 4,000 animals in loving homes
            and provided many more with temporary care through our programs.
          </p> */}
          <div className="flex gap-4 justify-center pt-6">
            <a
              href="https://www.facebook.com/pages/Paw-Prints-Animal-Rescue/201167013239191?ref=hl"
              aria-label="Follow us on Facebook"
              className="hover:scale-110 transform transition-transform"
            >
              <img src={facebookIcon} alt="" />
            </a>
            <a
              href="https://twitter.com/pawprintsanimal"
              aria-label="Follow us on Twitter"
              className="hover:scale-110 transform transition-transform"
            >
              <img src={twitterIcon} alt="" />
            </a>
            <a
              href="http://youtu.be/d14wfRw7250"
              aria-label="Follow us on YouTube"
              className="hover:scale-110 transform transition-transform"
            >
              <img src={youtubeIcon} alt="" />
            </a>
          </div>
        </div>
        <div className="rounded-lg w-full mx-auto col-span-12 lg:col-span-6 2xl:row-span-3 -order-1 lg:order-none">
          <iframe
            className="border-0 w-full h-auto aspect-video rounded-lg"
            src="https://www.youtube.com/embed/d14wfRw7250"
            title="Paw Prints Animal Rescue (Raleigh-Durham Area, NC)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm col-span-12 lg:col-span-6">
          Paw Prints is an all-volunteer, nonprofit organization dedicated to
          reducing the population of homeless cats, kittens, dogs and puppies
          through foster care, medical treatment and adoption into forever
          homes. We receive no government funding and greatly appreciate
          tax-deductible contributions from animal lovers like you. Paw Prints
          makes a lifetime commitment to every animal we rescue. We never want
          these animals to be homeless again.
        </p>
        <p className="flex items-center justify-center h-32 lg:h-60 2xl:h-auto bg-white/25 py-2 px-4 rounded-2xl col-span-12 lg:col-span-6 lg:row-span-2 2xl:row-span-1">
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
        </p>
        <p className="text-xs col-span-12 lg:col-span-6">
          Financial information about this organization and a copy of its
          license are available from the North Carolina State Solicitation
          Licensing Branch at (919) 807-2214. The license is not an endorsement
          by the State.
        </p>
      </div>
    </div>
  );
};
