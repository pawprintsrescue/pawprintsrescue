import feralcat from '../assets/feralcat.jpeg';

export const FeralPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-brown-900">
        Feral Cat Management Program
      </h1>

      <div className="flex flex-col md:block">
        <img
          src={feralcat}
          alt=""
          className="md:float-right md:ml-3 md:mb-3 rounded-lg order-1 mt-4 md:order-none md:mt-0"
        />
        <p className="mb-4">
          When Paw Prints was formed in 2004, several of the organization&apos;s
          founders were also very active in local feral cat trap-neuter-return
          efforts. They felt that the Triangle area had a number of low-cost
          surgical resources for feral cat programs but very little was being
          done to help manage colonies during and after the trapping and surgery
          phases. In fact, a much larger amount of resources is needed in the
          post-surgical phase of a trap-neuter-return program with respect to
          volunteer hours to provide food, water and shelter to the cats and
          funds to purchase cat food. For these reasons, feral cat management
          was included in the mission statement of the organization. Paw Prints
          currently manages a number of feral cat colonies in the Garner/South
          Raleigh area. Management includes providing food and water daily,
          trapping, sterilizing and vaccinating cats, pulling friendly cats and
          kittens for possible adoption, and managing major health and
          end-of-life issues. Over the years, the number of cats living in these
          colonies has steadily decreased either through attrition or adoption.
          The quality of life for the cats has stabilized and improved. The
          introduction of new cats to the colonies--either due to abandonment or
          breeding--has decreased as well. The goal of the program is to
          eventually reduce the size of these colonies to as close to zero as
          possible. Contact us if you would like to become part of our feral cat
          feeding team or would otherwise like help with the Feral Cat
          Management Program!
        </p>
        <p>
          For more information, contact us at{' '}
          <a
            href="mailto:info@pawprintsrescue.org"
            className="font-semibold hover:underline"
          >
            info@pawprintsrescue.org
          </a>{' '}
          or by telephone at{' '}
          <a href="tel:9197729107" className="font-semibold hover:underline">
            (919) 772-9107
          </a>
          .
        </p>
      </div>
      <div className="md:clear-right"></div>
    </div>
  );
};
