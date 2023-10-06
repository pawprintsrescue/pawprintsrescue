export const DogsSummary = () => {
  return (
    <>
      <p className="text-sm font-bold">
        All Paw Prints dogs and older puppies are:
      </p>
      <ol className="mb-2 list-decimal pl-4 text-sm">
        <li>
          Heartworm tested (and negative unless otherwise noted) and on
          heartworm prevention
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
        <li>Treated for internal and external parasites</li>
      </ol>
      <p className="mb-2 text-sm font-bold">
        Unless otherwise noted, our adoption fee for dogs and older puppies is
        $200 or two for $350, and the adoption fee for senior dogs (7+ years) is
        $100.
      </p>
    </>
  );
};
