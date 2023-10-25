const payments = [
  {
    id: 1,
    name: 'Bob Lee',
    money: 1000,
    date: '2020-02-24',
  },
  {
    id: 2,
    name: 'John Seek',
    money: 1999.99,
    date: '2020-02-25',
  },
  {
    id: 3,
    name: 'Harry Smith',
    money: 3000.5,
    date: '2020-02-26',
  },
  {
    id: 4,
    name: 'Alex Morphy',
    money: 4000,
    date: '2020-02-27',
  },
  {
    id: 5,
    name: 'Ben Gold',
    money: 5000,
    date: '2020-02-28',
  },
  {
    id: 6,
    name: 'Tim Black',
    money: 10000,
    date: '2020-02-28',
  },
  {
    id: 7,
    name: 'Jimmy Elephant',
    money: 1000000,
    date: '2020-02-30',
  },
];

export default ({ page = 1, pageSize = 5, money = 0 } = {}) => {
  return new Promise((resolve) => {
    const from = pageSize * (page - 1);
    const to = pageSize * page;

    let filteredItems;
    if (money) {
      filteredItems = payments.filter((item) => item.money <= money);
    } else {
      filteredItems = payments;
    }

    const total = filteredItems.length;

    setTimeout(() => {
      const response = {
        data: to > total && money ? filteredItems.slice(from, total) : filteredItems.slice(from, to),
        page,
        pageCount: Math.ceil(total / pageSize),
      };

      resolve(response);
    }, Math.random() * 1500);
  });
};
