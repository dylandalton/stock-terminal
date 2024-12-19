import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { updateHoldingAsync } from "@/state/slices/userSlice"
import { useAppDispatch } from "@/lib/hooks/typedHooks"
import { Holding, Purchase } from "@/models/User"

interface ModifyModalProps {
  isOpen: boolean
  onClose: () => void
  userId?: string;
  holding: Holding | undefined;
}

interface FieldState {
  value: string | number | undefined
  touched: boolean
  error: string
}

export function ModifyModal({ isOpen, onClose, userId, holding }: ModifyModalProps) {
  const [symbol, setSymbol] = useState<FieldState>({ value: holding?.symbol, touched: false, error: "" })
  const [companyName, setCompanyName] = useState<FieldState>({ value: holding?.companyName, touched: false, error: "" })
  const [executionPrice, setExecutionPrice] = useState<FieldState>({ value: 0, touched: false, error: "" })
  const [sharesToModify, setSharesToModify] = useState<FieldState>({ value: 0, touched: false, error: "" })
  const [purchaseDate, setPurchaseDate] = useState<FieldState>({ value: new Date().toISOString().split('T')[0], touched: false, error: "" })
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isFormValid, setIsFormValid] = useState(false)
  const holdingId: string = holding?._id!; // Never undefined

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      setSymbol(symbol);
      setCompanyName(companyName);
      setExecutionPrice({ value: 0, touched: false, error: "" })
      setSharesToModify({ value: 0, touched: false, error: "" })
      setDate(new Date())
      setPurchaseDate({ value: new Date().toISOString().split('T')[0], touched: false, error: "" })
    }
  }, [isOpen])

  useEffect(() => {
    const validateField = (field: FieldState, fieldName: string) => {
      if (field.touched && (field.value?.toString()?.trim() ?? '') === "") {
        return `The ${fieldName} cannot be left empty`
      }
      return ""
    }

    const executionPriceError = executionPrice.touched && (Number(executionPrice.value) <= 0) 
      ? "The Execution Price must be greater than 0" 
      : ""
    const sharesToModifyError = sharesToModify.touched && (Number(sharesToModify.value) <= 0) 
      ? "The Shares must be greater than 0" 
      : ""
    const purchaseDateError = validateField(purchaseDate, "Purchase Date")

    setExecutionPrice(prev => ({ ...prev, error: executionPriceError }))
    setSharesToModify(prev => ({ ...prev, error: sharesToModifyError }))
    setPurchaseDate(prev => ({ ...prev, error: purchaseDateError }))

    setIsFormValid(
      executionPriceError === "" &&
      sharesToModifyError === "" &&
      purchaseDateError === "" &&
      Number(executionPrice.value) > 0 &&
      Number(sharesToModify.value) > 0 &&
      purchaseDate.value?.toString().trim() !== ""
    )
  }, [executionPrice, sharesToModify, purchaseDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !userId || !holding || !date) return;
  
    const newPurchase: Purchase = {
      shares: Number(sharesToModify.value),
      price: Number(executionPrice.value),
      purchaseDate: date.toISOString().split('T')[0]
    }

    const updatedHolding: Holding = {
      ...holding,
      shares: holding.shares + Number(sharesToModify.value),
      averagePrice: calculateNewAveragePrice(holding, newPurchase),
      purchases: [...(holding.purchases || []), newPurchase]
    }
    dispatch(updateHoldingAsync({ userId, holdingId, holdingData: updatedHolding }));
    onClose();
  };

  const calculateNewAveragePrice = (currentHolding: Holding, newPurchase: Purchase): number => {
    const totalShares = currentHolding.shares + newPurchase.shares
    const totalValue = (currentHolding.shares * currentHolding.averagePrice) + (newPurchase.shares * newPurchase.price)
    return totalValue / totalShares
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<FieldState>>, value: string | number) => {
    setter(prev => ({ ...prev, value, touched: true }))
  }
  // Make symbol and companyName readonly
  // Remove shares & averagePrice fields
  // Make holding total shares dynamic and adjusts as the user adjusts the shares field
  // Make holding total average price dynamic and adjusts as the user adjusts the average price field
  // Add fields for price, shares & purchaseDate
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an Investment Transaction</DialogTitle>
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
                readOnly
              />
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
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="executionPrice" className="text-right">
              Execution Price
            </Label>
            <div className="col-span-3">
              <Input
                id="executionPrice"
                value={executionPrice.value}
                onChange={(e) => handleInputChange(setExecutionPrice, Number(e.target.value))}
                placeholder="420.50"
                type="number"
                step="0.01"
                className={`${executionPrice.error ? 'border-red-500' : ''}`}
                required
                min="0.01"
              />
              {executionPrice.error && <p className="text-red-500 text-sm mt-1">{executionPrice.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shares" className="text-right col-span-1">
              Adjust Price
            </Label>
            <Slider
              value={[Number(executionPrice.value)]}
              onValueChange={(value) => handleInputChange(setExecutionPrice, value[0])}
              min={0}
              max={1000}
              step={5}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sharesToModify" className="text-right">Shares</Label>
            <div className="col-span-3">
              <Input
                id="sharesToModify"
                value={sharesToModify.value}
                onChange={(e) => handleInputChange(setSharesToModify, Number(e.target.value))}
                placeholder="150.00"
                type="number"
                className={`${sharesToModify.error ? 'border-red-500' : ''}`}
                required
                min="1"
              />
              {sharesToModify.error && <p className="text-red-500 text-sm mt-1">{sharesToModify.error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right col-span-1">Shares Bought/Sold</Label>
            <Slider
              value={[Number(sharesToModify.value)]}
              onValueChange={(value) => handleInputChange(setSharesToModify, value[0])}
              min={0}
              max={1000}
              step={5}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="purchaseDate" className="text-right">Purchase Date</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate: Date | undefined) => {
                        setDate(newDate)
                        if (newDate) {
                          handleInputChange(setPurchaseDate, newDate.toISOString().split('T')[0])
                        }
                      }}
                      initialFocus
                    />
                </PopoverContent>
              </Popover>
              {purchaseDate.error && <p className="text-red-500 text-sm mt-1">{purchaseDate.error}</p>}
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={!isFormValid}>Add Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}