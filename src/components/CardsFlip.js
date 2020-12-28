import { useState } from 'react'

const Card = ({ card, field, onClick }) => {
  return (
    <div
      className="p-4 shadow-md ring-1 ring-gray-300 rounded-xl"
      onClick={() => onClick(field === 'term' ? 'definition' : 'term')}
    >
      <span className="text-xs text-gray-500 uppercase">{field}</span>
      <div className="flex justify-center py-14">
        <p>{card[field]}</p>
      </div>
      <div className="flex justify-end">
        <span className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded-lg">
          Tap to Flip
        </span>
      </div>
    </div>
  )
}

export const CardsFlip = ({ cards }) => {
  const [cardIdx, setCardIdx] = useState(0)
  const [cardField, setCardField] = useState('term')

  return (
    <>
      <Card card={cards[cardIdx]} field={cardField} onClick={setCardField} />
      <div className="flex items-center justify-center mt-4 space-x-4">
        {cardIdx >= 1 && (
          <button
            onClick={() => {
              setCardIdx(cardIdx - 1)
              setCardField('term')
            }}
            className="p-1 text-blue-500 bg-blue-500 rounded-full focus:outline-none bg-opacity-10"
            aria-label="add set to my account"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
        )}
        {cardIdx < cards.length - 1 && (
          <button
            onClick={() => {
              setCardIdx(cardIdx + 1)
              setCardField('term')
            }}
            className="p-1 text-blue-500 bg-blue-500 rounded-full bg-opacity-10 focus:outline-none"
            aria-label="add set to my account"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  )
}

/*
  const renderCards = cards.map((card) => {
    return (
      <li key={card.id}>
        <div className="relative p-6 shadow-sm ring-1 ring-gray-300 rounded-xl">
          <div className="grid sm:grid-cols-3 space-y-6 sm:space-y-0">
            <div>
              <span className="text-xs text-gray-500 uppercase">term</span>
              <p className="font-medium text-gray-900">{card.term}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase">
                definition
              </span>
              <p className="text-gray-900 sm:col-span-2">{card.definition}</p>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return <ul className="space-y-10">{renderCards}</ul>
  */