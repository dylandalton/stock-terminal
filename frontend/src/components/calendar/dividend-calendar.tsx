import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, CircleArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Dividend {
  symbol: string
  dividend: number
  date: string
  declarationDate: string
}

interface DividendCalendarProps {
  dividends: Dividend[]
}

const DividendCalendar: React.FC<DividendCalendarProps> = ({ dividends }) => {
  console.log("dividends: ", dividends);
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getDividendsForDay = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = new Date(year, month, day)
    return dividends.filter(dividend => new Date(dividend.date).toDateString() === date.toDateString())
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 w-28"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDividends = getDividendsForDay(day)
      const hasDividend = dayDividends.length > 0

      days.push(
        <Popover key={day}>
          <PopoverTrigger asChild>
            <div
              className={`h-28 w-28 border border-gray-200 p-2 cursor-pointer transition-colors ${
                hasDividend ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold">{day}</div>
              {hasDividend && (
                <div className="mt-1">
                  <div className="font-bold">{dayDividends[0].symbol}</div>
                  <div className="text-sm">${dayDividends[0].dividend.toFixed(2)}</div>
                </div>
              )}
            </div>
          </PopoverTrigger>
          {hasDividend && (
            <PopoverContent className="w-60">
              {dayDividends.map((dividend, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="font-bold">{dividend.symbol}</div>
                  <div>Dividend: ${dividend.dividend.toFixed(2)}</div>
                  <div>Date: {new Date(dividend.date).toLocaleDateString()}</div>
                  <div>Declaration: {new Date(dividend.declarationDate).toLocaleDateString()}</div>
                </div>
              ))}
            </PopoverContent>
          )}
        </Popover>
      )
    }

    return days
  }

  return (
    <>
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </CardTitle>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-semibold text-center py-2">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </CardContent>
    </Card>
    <section>
        <div className="container m-auto py-6 px-6">
            <Link
            to="/home"
            className="text-black hover:text-indigo-600 flex items-center"
            >
            <CircleArrowLeft className="mr-2" /> Back to Portfolio Dashboard
            </Link>
        </div>
    </section>
    </>
  )
}

export default DividendCalendar

