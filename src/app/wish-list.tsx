export const WishListPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-brown-900">Wish list</h1>

      <p className="mb-2">
        <b>Here are some things we could use!</b> Call{' '}
        <a href="tel:9197729107" className="font-semibold hover:underline">
          (919) 772-9107
        </a>{' '}
        or email{' '}
        <a
          href="mailto:info@pawprintsrescue.org"
          className="font-semibold hover:underline"
        >
          info@pawprintsrescue.org
        </a>{' '}
        if you would like to donate any of the following items.
        <br />
        We greatly appreciate anything you can do to help us help the animals.
      </p>
      <ul className="font-bold list-disc pl-4">
        <li>Canned and dry cat food: Any brand</li>
        <li>Canned and dry dog food: Any brand</li>
        <li>
          Cat litter: Both scoopable, clumping type and Feline Pine (or any
          brand that is made from pine pellets)
        </li>
        <li>
          Flea/parasite treatments: Capstar (or generic brand) and Advantage II
          for dogs and cats
        </li>
        <li>Pet beds</li>
        <li>Cat carriers</li>
        <li>Dog crates</li>
        <li>Dog leashes, collars and harnesses</li>
        <li>Cat and dog toys</li>
        <li>
          Scratching posts, cat trees: The cardboard ones are inexpensive and
          work just fine!
        </li>
        <li>Paper towels and Clorox wipes</li>
        <li>Gift cards to PetSmart, Wal-Mart or Target</li>
      </ul>
    </div>
  );
};
