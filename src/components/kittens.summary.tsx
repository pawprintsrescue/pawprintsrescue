export const KittensSummary = () => {
  return (
    <>
      <p className="text-sm font-bold">All Paw Prints kittens are:</p>
      <ol className="mb-2 list-decimal pl-4 text-sm">
        <li>
          Tested for the feline leukemia (FeLV) and the feline immunodeficiency
          (FIV) viruses (and negative unless otherwise noted)
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
        <li>Treated for internal and external parasites</li>
      </ol>
      <p className="mb-2 text-sm font-bold">
        Unless otherwise noted, our adoption fee for kittens is $125 or $215 for
        two kittens.
      </p>
    </>
  );
};
