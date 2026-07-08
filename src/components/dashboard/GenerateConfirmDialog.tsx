import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from '@blinkdotnew/ui'
import { Sparkles } from 'lucide-react'

export interface GenerateConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  featureLabel: string
}

export function GenerateConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  featureLabel,
}: GenerateConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Generation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="size-6 text-primary" />
          </div>

          <DialogDescription className="text-center">
            This feature will be connected to the AI engine in the next version.
          </DialogDescription>

          <p className="text-xs text-muted-foreground">
            Generating:{' '}
            <span className="font-medium text-foreground">{featureLabel}</span>
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="gap-2">
            <Sparkles className="size-3.5" />
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
