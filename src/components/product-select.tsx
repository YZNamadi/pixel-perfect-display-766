import { ProductSelect } from "@/components/product-select";
import { forwardRef, useEffect, useRef, useState, type SelectHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Option = { value: string; label: string; disabled: boolean };

/** Retains the native form field and its handlers while presenting the shared product menu. */
export const ProductSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function ProductSelect({ children, className, style, onInvalid, ...props }, forwardedRef) {
    const nativeRef = useRef<HTMLSelectElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState(String(props.value ?? props.defaultValue ?? ""));
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const select = nativeRef.current;
      if (!select) return;
      const next = Array.from(select.options).map((option) => ({ value: option.value, label: option.text, disabled: option.disabled || Boolean(option.closest("optgroup")?.disabled) }));
      setOptions((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
      setSelected(select.value);
    });

    useEffect(() => {
      const form = nativeRef.current?.form;
      const reset = () => requestAnimationFrame(() => setSelected(nativeRef.current?.value ?? ""));
      form?.addEventListener("reset", reset);
      return () => form?.removeEventListener("reset", reset);
    }, []);

    return (
      <span className="product-select-wrap">
        <ProductSelect {...props} className="product-select-native" tabIndex={-1} aria-hidden="true"
          ref={(element) => {
            nativeRef.current = element;
            if (typeof forwardedRef === "function") forwardedRef(element);
            else if (forwardedRef) forwardedRef.current = element;
          }}
          onInvalid={(event) => {
            onInvalid?.(event);
            event.preventDefault();
            triggerRef.current?.focus();
            setOpen(true);
          }}
        >{children}</ProductSelect>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button ref={triggerRef} type="button" variant="outline" className={`product-select-trigger ${className ?? ""}`} style={style}
              disabled={props.disabled} aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]}
              aria-required={props.required}>
              <span>{options.find((option) => option.value === selected)?.label ?? selected}</span>
              <span className="product-select-chevron" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={14} className="dc-filter-menu product-select-menu">
            <DropdownMenuRadioGroup value={selected} onValueChange={(value) => {
              const select = nativeRef.current;
              if (!select) return;
              select.value = value;
              setSelected(value);
              select.dispatchEvent(new Event("change", { bubbles: true }));
            }}>
              {options.map((option, index) => <DropdownMenuRadioItem key={`${option.value}-${index}`} value={option.value} disabled={option.disabled} className="dc-filter-option">
                <span className="dc-filter-dot" aria-hidden="true" />{option.label}
              </DropdownMenuRadioItem>)}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    );
  },
);