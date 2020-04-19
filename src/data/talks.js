import {
  preparePresentationData,
  sortByPresentationDate,
} from '../lib/prepare-presentation-data'

export default [
  // {
  //   title: '',
  //   resources: [],
  //   tags: [],
  //   deliveries: [
  //     {
  //       event: '',
  //       date: '',
  //       recording: '',
  //     }
  //   ],
  //   description: `
  //   `,
  // },
  {
    title: `Microservices, event sourcing and CQRS`,
    resources: [
      '[slides](https://speakerdeck.com/thiagozf/microservices-event-sourcing-e-cqrs)',
      '[repo](https://github.com/thiagozf/reactive-microservices)',
    ],
    deliveries: [
      {
        event:
          '[9° Meetup Criciúma Dev](https://www.sympla.com.br/9-meetup-criciuma-dev__367306)',
        recording: 'https://youtu.be/vIGZxeQUUFU?t=1m51s',
        date: '2018-10-06',
      },
    ],
    description: `
      A microservices architecture present many challenges. Things like fault tolerance, data consistency and service communication become specially complex.
      In this talk, Thiago presents how concepts like DDD and CQRS can help you to tackle some of these challenges.
      He discusses advantages and disadvantages of these architectures, while doing a live demo implementation.
    `,
  },
]
  .map(preparePresentationData)
  .sort(sortByPresentationDate)
