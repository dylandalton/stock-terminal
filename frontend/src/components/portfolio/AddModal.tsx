import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FieldState {
  value: string | number
  touched: boolean
  error: string
}

export function AddModal({ isOpen, onClose }: AddModalProps) {
  const [symbol, setSymbol] = useState<FieldState>({ value: "", touched: false, error: "" })
  const [companyName, setCompanyName] = useState<FieldState>({ value: "", touched: false, error: "" })
  const [averagePrice, setAveragePrice] = useState<FieldState>({ value: 420.50, touched: false, error: "" })
  const [shares, setShares] = useState<FieldState>({ value: 150, touched: false, error: "" })

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSymbol({ value: "", touched: false, error: "" })
      setCompanyName({ value: "", touched: false, error: "" })
      setAveragePrice({ value: 420.50, touched: false, error: "" })
      setShares({ value: 150, touched: false, error: "" })
    }
  }, [isOpen])

  useEffect(() => {
    const validateField = (field: FieldState, fieldName: string) => {
      if (field.touched && field.value.toString().trim() === "") {
        return `The ${fieldName} cannot be left empty`
      }
      return ""
    }

    const symbolError = validateField(symbol, "Symbol")
    const companyNameError = validateField(companyName, "Company Name")
    const averagePriceError = averagePrice.touched && (Number(averagePrice.value) <= 0) ? "The Average Price must be greater than 0" : ""
    const sharesError = shares.touched && (Number(shares.value) <= 0) ? "The Shares must be greater than 0" : ""

    setSymbol(prev => ({ ...prev, error: symbolError }))
    setCompanyName(prev => ({ ...prev, error: companyNameError }))
    setAveragePrice(prev => ({ ...prev, error: averagePriceError }))
    setShares(prev => ({ ...prev, error: sharesError }))

    setIsFormValid(
      symbolError === "" &&
      companyNameError === "" &&
      averagePriceError === "" &&
      sharesError === "" &&
      symbol.value.toString().trim() !== "" &&
      companyName.value.toString().trim() !== "" &&
      Number(averagePrice.value) > 0 &&
      Number(shares.value) > 0
    )
  }, [symbol, companyName, averagePrice, shares])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      console.log({ 
        symbol: symbol.value, 
        companyName: companyName.value, 
        averagePrice: averagePrice.value, 
        shares: shares.value 
      })
      onClose()
    }
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<FieldState>>, value: string | number) => {
    setter(prev => ({ ...prev, value, touched: true }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an Investment</DialogTitle>
          <DialogDescription>Fill in every field</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <div className="col-span-3">
              <Input
                id="symbol"
                value={symbol.value}
                onChange={(e) => handleInputChange(setSymbol, e.target.value)}
                placeholder="MSFT"
                className={`${symbol.error ? 'border-red-500' : ''}`}
                required
              />
              {symbol.error && <p className="text-red-500 text-sm mt-1">{symbol.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <div className="col-span-3">
              <Input
                id="companyName"
                value={companyName.value}
                onChange={(e) => handleInputChange(setCompanyName, e.target.value)}
                placeholder="Microsoft Corp"
                className={`${companyName.error ? 'border-red-500' : ''}`}
                required
              />
              {companyName.error && <p className="text-red-500 text-sm mt-1">{companyName.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="averagePrice" className="text-right">
              Average Price
            </Label>
            <div className="col-span-3">
              <Input
                id="averagePrice"
                value={averagePrice.value}
                onChange={(e) => handleInputChange(setAveragePrice, Number(e.target.value))}
                placeholder="420.50"
                type="number"
                step="0.01"
                className={`${averagePrice.error ? 'border-red-500' : ''}`}
                required
                min="0.01"
              />
              {averagePrice.error && <p className="text-red-500 text-sm mt-1">{averagePrice.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right col-span-1">Adjust Price</Label>
            <Slider
              value={[Number(averagePrice.value)]}
              onValueChange={(value) => handleInputChange(setAveragePrice, value[0])}
              min={0}
              max={1000}
              step={5}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shares" className="text-right">
              Shares
            </Label>
            <div className="col-span-3">
              <Input
                id="shares"
                value={shares.value}
                onChange={(e) => handleInputChange(setShares, Number(e.target.value))}
                placeholder="150.00"
                type="number"
                className={`${shares.error ? 'border-red-500' : ''}`}
                required
                min="1"
              />
              {shares.error && <p className="text-red-500 text-sm mt-1">{shares.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right col-span-1">Adjust Shares</Label>
            <Slider
              value={[Number(shares.value)]}
              onValueChange={(value) => handleInputChange(setShares, value[0])}
              min={0}
              max={1000}
              step={5}
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="mt-4" disabled={!isFormValid}>Add Investment</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}