import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./UniversalSelect.css";

const cx = (
  ...classes: Array<string | false | null | undefined | Record<string, boolean | undefined | null>>
) => {
  const tokens: string[] = [];
  classes.forEach((entry) => {
    if (!entry) return;
    if (typeof entry === "string") {
      tokens.push(entry);
      return;
    }
    Object.entries(entry).forEach(([key, active]) => {
      if (active) tokens.push(key);
    });
  });
  return tokens.join(" ");
};

type SelectSize = "sm" | "md" | "lg";

type SelectValue = string | string[];

type BaseOption = {
  value: string;
  label: string;
  group?: string;
  icon?: ReactNode;
  meta?: string;
  disabled?: boolean;
};

type SingleSelectProps = {
  multiple?: false;
  value?: string;
  onChange: (value: string | null) => void;
};

type MultiSelectProps = {
  multiple: true;
  value?: string[];
  onChange: (value: string[]) => void;
};

type CommonSelectProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  options: BaseOption[];
  searchable?: boolean;
  withIcons?: boolean;
  size?: SelectSize;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  footerActions?: boolean;
  bottomSheetTitle?: string;
  mobileBehavior?: "auto" | "sheet";
};

type UniversalSelectProps = CommonSelectProps & (SingleSelectProps | MultiSelectProps);

type OptionGroup = {
  header?: string;
  options: BaseOption[];
};

const SELECT_MENU_PORTAL_ID = "select-menu-portal";

const sizes: Record<SelectSize, string> = {
  sm: "select-trigger--sm",
  md: "select-trigger--md",
  lg: "select-trigger--lg",
};

const isClient = typeof window !== "undefined";

const ensurePortalRoot = () => {
  if (!isClient) return null;
  let node = document.getElementById(SELECT_MENU_PORTAL_ID);
  if (!node) {
    node = document.createElement("div");
    node.setAttribute("id", SELECT_MENU_PORTAL_ID);
    document.body.appendChild(node);
  }
  return node;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => (isClient ? window.innerWidth <= 768 : false));

  useEffect(() => {
    if (!isClient) return;
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
};

const Spinner = () => (
  <svg className="select-spinner" viewBox="0 0 24 24" role="status" aria-label="Loading">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const splitIntoGroups = (options: BaseOption[]): OptionGroup[] => {
  const groups: Record<string, BaseOption[]> = {};
  const ungrouped: BaseOption[] = [];

  options.forEach((option) => {
    if (option.group) {
      if (!groups[option.group]) groups[option.group] = [];
      groups[option.group].push(option);
    } else {
      ungrouped.push(option);
    }
  });

  const groupedEntries = Object.entries(groups).map(([header, groupOptions]) => ({ header, options: groupOptions }));

  return ungrouped.length > 0
    ? [{ options: ungrouped }, ...groupedEntries]
    : groupedEntries;
};

const getDisplayValue = (value: SelectValue | undefined, options: BaseOption[], multiple: boolean | undefined, placeholder?: string) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return placeholder ?? "Select";

  if (multiple) {
    const labels = options.filter((option) => Array.isArray(value) && value.includes(option.value)).map((option) => option.label);
    if (labels.length === 0) return placeholder ?? "Select";
    if (labels.length <= 2) return labels.join(", ");
    return `${labels.length} selected`;
  }

  const selected = options.find((option) => option.value === value);
  return selected?.label ?? placeholder ?? "Select";
};

const normalizeValue = (value: SelectValue | undefined, multiple: boolean | undefined): string[] => {
  if (!value) return [];
  return multiple ? (Array.isArray(value) ? value : [value]) : [value as string];
};

const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
  when = true
) => {
  useEffect(() => {
    if (!when) return;
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, when]);
};

const useFocusTrap = (containerRef: React.RefObject<HTMLElement | null>, active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    const focusable = container.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          (last ?? first)?.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          (first ?? last)?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, active]);
};

export const UniversalSelect = (props: UniversalSelectProps) => {
  const {
    id,
    name,
    placeholder,
    options,
    label,
    description,
    searchable = false,
    withIcons = false,
    size = "md",
    disabled,
    invalid,
    loading,
    clearable = true,
    className,
    triggerClassName,
    menuClassName,
    optionClassName,
    footerActions,
    bottomSheetTitle,
    mobileBehavior = "auto",
  } = props;

  const multiple = !!props.multiple;
  const externalValue = props.value;
  const normalizedValue = normalizeValue(externalValue, multiple);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [pendingValue, setPendingValue] = useState<string[]>(normalizedValue);
  const isMobile = useIsMobile();
  const shouldUseBottomSheet = mobileBehavior === "sheet" && isMobile;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setPendingValue(normalizedValue);
  }, [externalValue?.toString()]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, searchQuery]);

  const groupedOptions = useMemo(() => splitIntoGroups(filteredOptions), [filteredOptions]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => !prev);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchQuery("");
    setHighlightedIndex(0);
  }, []);

  useOutsideClick(menuRef, handleClose, open && !shouldUseBottomSheet);
  useOutsideClick(sheetRef, handleClose, open && shouldUseBottomSheet);
  useFocusTrap(sheetRef, open && shouldUseBottomSheet);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open || shouldUseBottomSheet) return;

    const updatePosition = () => {
      if (!triggerRef.current || !menuRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      let top = triggerRect.bottom + scrollY + 8;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      if (spaceBelow < menuRect.height + 16) {
        top = triggerRect.top + scrollY - menuRect.height - 8;
      }

      const left = triggerRect.left + scrollX;
      const maxLeft = scrollX + window.innerWidth - menuRect.width - 8;
      const clampedLeft = Math.min(Math.max(left, scrollX + 8), Math.max(scrollX + 8, maxLeft));

      setMenuPosition({
        top: Math.max(scrollY + 8, top),
        left: clampedLeft,
        width: triggerRect.width,
      });
    };

    const frame = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, shouldUseBottomSheet]);

  const commitValue = useCallback(
    (value: string) => {
      if (multiple) {
        setPendingValue((prev) => {
          const exists = prev.includes(value);
          const next = exists ? prev.filter((item) => item !== value) : [...prev, value];
          return next;
        });
      } else {
        props.onChange(value === externalValue ? null : value);
        handleClose();
      }
    },
    [multiple, props, externalValue, handleClose]
  );

  const applyMultiSelection = useCallback(() => {
    if (!multiple) return;
    props.onChange(pendingValue);
    handleClose();
  }, [multiple, props, pendingValue, handleClose]);

  const clearSelection = useCallback(() => {
    if (multiple) {
      setPendingValue([]);
      props.onChange([]);
      if (!footerActions) {
        handleClose();
      }
    } else {
      props.onChange(null);
      handleClose();
    }
  }, [multiple, props, handleClose, footerActions]);

  const currentDisplayValue = useMemo(
    () =>
      getDisplayValue(
        multiple ? pendingValue : externalValue,
        options,
        multiple,
        placeholder
      ),
    [externalValue, pendingValue, options, multiple, placeholder]
  );

  const currentValues = multiple ? pendingValue : normalizedValue;

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case " ": {
        event.preventDefault();
        setOpen(true);
        break;
      }
      default: {
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          setSearchQuery((prev) => prev + event.key.toLowerCase());
          setOpen(true);
        }
      }
    }
  };

  const flatOptions = filteredOptions;

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    const maxIndex = flatOptions.length - 1;
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        break;
      }
      case "Home": {
        event.preventDefault();
        setHighlightedIndex(0);
        break;
      }
      case "End": {
        event.preventDefault();
        setHighlightedIndex(maxIndex);
        break;
      }
      case "Enter": {
        event.preventDefault();
        const option = flatOptions[highlightedIndex];
        if (option && !option.disabled) {
          commitValue(option.value);
        }
        break;
      }
      case "Tab": {
        if (!shouldUseBottomSheet) {
          handleClose();
        }
        break;
      }
      default:
        break;
    }
  };

  const renderOption = (option: BaseOption, optionIndex: number) => {
    const selected = currentValues.includes(option.value);
    const classes = cx("select-option", optionClassName, {
      "select-option--selected": selected && !multiple,
      "select-option--disabled": option.disabled,
    });

    return (
      <button
        key={option.value}
        type="button"
        role="option"
        aria-selected={selected}
        className={classes}
        data-highlighted={highlightedIndex === optionIndex}
        disabled={option.disabled}
        onClick={() => commitValue(option.value)}
        onMouseEnter={() => setHighlightedIndex(optionIndex)}
      >
        {multiple ? (
          <input
            type="checkbox"
            readOnly
            tabIndex={-1}
            checked={selected}
            className="select-option__checkbox"
          />
        ) : null}
        {withIcons && option.icon ? (
          <span className="select-option__icon" aria-hidden="true">
            {option.icon}
          </span>
        ) : null}
        <span className="select-option__label">{option.label}</span>
        {option.meta && <span className="select-option__meta">{option.meta}</span>}
        {!multiple && selected ? (
          <span className="select-option__check" aria-hidden="true">
            ✓
          </span>
        ) : null}
      </button>
    );
  };

  const portalNode = useMemo(() => ensurePortalRoot(), []);

  const triggerClasses = cx(
    "select-trigger",
    sizes[size],
    triggerClassName,
    className,
    {
      "select-trigger--open": open,
      "select-trigger--disabled": disabled,
      "select-trigger--invalid": invalid,
      "select-trigger--loading": loading,
      "select-trigger--with-icon": withIcons,
    }
  );

  const caretClasses = cx("select-caret", {
    "select-caret--open": open,
  });

  const menuContent = (
    <div
      className={cx("select-menu", menuClassName, {
        "select-menu--has-footer": footerActions && multiple,
      })}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      ref={menuRef}
      style={{
        minWidth: menuPosition.width || triggerRef.current?.offsetWidth || undefined,
        top: menuPosition.top,
        left: menuPosition.left,
        position: "absolute" as const,
      }}
      tabIndex={-1}
      onKeyDown={handleMenuKeyDown}
    >
      {searchable ? (
        <div className="select-search">
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
          />
        </div>
      ) : null}

      {filteredOptions.length === 0 ? (
        <div className="select-empty">No results</div>
      ) : (
        <div className="select-options">
          {groupedOptions.map((group, groupIndex) => (
            <div key={`group-${group.header ?? groupIndex}`} className="select-group">
              {group.header ? <div className="select-group__header">{group.header}</div> : null}
              {group.options.map((option) => {
                const index = filteredOptions.indexOf(option);
                return renderOption(option, index);
              })}
            </div>
          ))}
        </div>
      )}

      {multiple && footerActions ? (
        <div className="select-footer">
          <button type="button" className="select-btn select-btn--ghost" onClick={clearSelection}>
            Clear
          </button>
          <button type="button" className="select-btn select-btn--primary" onClick={applyMultiSelection}>
            Apply
          </button>
        </div>
      ) : null}
    </div>
  );

  const sheetContent = (
    <div className={cx("select-sheet", { "select-sheet--open": open })} ref={sheetRef}>
      <div className="select-sheet__handle" aria-hidden="true" />
      <div className="select-sheet__header">
        <span className="select-sheet__title">{bottomSheetTitle ?? label ?? "Select"}</span>
        <button type="button" className="select-sheet__close" onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
      {searchable ? (
        <div className="select-sheet__search">
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
          />
        </div>
      ) : null}
      <div className="select-sheet__options" onKeyDown={handleMenuKeyDown}>
        <div role="listbox" aria-multiselectable={multiple || undefined} className="select-sheet__options-inner">
        {filteredOptions.length === 0 ? (
          <div className="select-empty">No results</div>
        ) : (
          groupedOptions.map((group, groupIndex) => (
            <div key={`sheet-group-${group.header ?? groupIndex}`} className="select-group">
              {group.header ? <div className="select-group__header">{group.header}</div> : null}
              {group.options.map((option) => {
                const index = filteredOptions.indexOf(option);
                return renderOption(option, index);
              })}
            </div>
          ))
        )}
        </div>
      </div>
      {multiple ? (
        <div className="select-sheet__footer">
          <button type="button" className="select-btn select-btn--ghost" onClick={clearSelection}>
            Clear
          </button>
          <button type="button" className="select-btn select-btn--primary" onClick={applyMultiSelection}>
            Apply
          </button>
        </div>
      ) : (
        <div className="select-sheet__footer select-sheet__footer--single">
          <button type="button" className="select-btn select-btn--ghost" onClick={handleClose}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const menu = shouldUseBottomSheet ? sheetContent : menuContent;

  const showClearButton = clearable && !multiple && !!externalValue;

  return (
    <div className="select-root">
      {label ? (
        <label className="select-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="select-trigger-wrapper">
        <button
          type="button"
          ref={triggerRef}
          id={id}
          name={name}
          className={triggerClasses}
          data-open={open}
          aria-haspopup={multiple ? "listbox" : "listbox"}
          aria-expanded={open}
          aria-controls={open ? `${id ?? "select"}-menu` : undefined}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className="select-trigger__value">{currentDisplayValue}</span>
          <span className="select-trigger__icons">
            {loading ? <Spinner /> : null}
            {showClearButton ? (
              <button
                type="button"
                className="select-clear"
                onClick={(event) => {
                  event.stopPropagation();
                  clearSelection();
                }}
                aria-label="Clear selection"
              >
                ✕
              </button>
            ) : null}
            <svg className={caretClasses} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </button>
      </div>
      {description ? <p className="select-description">{description}</p> : null}
      {open && portalNode
        ? createPortal(
            <div className="select-portal-overlay">
              {shouldUseBottomSheet ? (
                <div className="select-sheet-backdrop" onClick={handleClose} aria-hidden="true" />
              ) : null}
              <div className="select-portal-content" id={`${id ?? "select"}-menu`}>
                {shouldUseBottomSheet ? menu : null}
              </div>
              {!shouldUseBottomSheet ? menu : null}
            </div>,
            portalNode
          )
        : null}
    </div>
  );
};

// Example showcase demonstrating variants

const categoryOptions: BaseOption[] = [
  { value: "all", label: "All Categories" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "development", label: "Development", icon: "💻" },
  { value: "marketing", label: "Marketing", icon: "📈" },
  { value: "writing", label: "Writing", icon: "✍️" },
  { value: "translation", label: "Translation", icon: "🌐" },
  { value: "video", label: "Video", icon: "🎬" },
];

const languageOptions: BaseOption[] = [
  { value: "en", label: "English" },
  { value: "kr", label: "Korean" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const sortOptions: BaseOption[] = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Rating" },
];

const groupedOptions: BaseOption[] = [
  { value: "ui", label: "UI Design", group: "Design", icon: "🎨" },
  { value: "branding", label: "Branding", group: "Design", icon: "🎨" },
  { value: "frontend", label: "Frontend", group: "Development", icon: "💻" },
  { value: "backend", label: "Backend", group: "Development", icon: "💻" },
  { value: "seo", label: "SEO", group: "Marketing", icon: "📈" },
  { value: "ads", label: "Performance Ads", group: "Marketing", icon: "📈" },
];

export const UniversalSelectShowcase = () => {
  const [category, setCategory] = useState<string | null>("design");
  const [languages, setLanguages] = useState<string[]>(["en", "kr"]);
  const [sort, setSort] = useState<string | null>("popularity");
  const [team, setTeam] = useState<string[]>([]);

  return (
    <div className="select-showcase">
      <h2>Universal Select System</h2>
      <div className="select-showcase__grid">
        <div className="select-showcase__card">
          <h3>Single Select</h3>
          <UniversalSelect
            id="category-select"
            label="Category"
            options={categoryOptions}
            value={category ?? undefined}
            onChange={setCategory}
            placeholder="Select category"
            withIcons
            size="md"
            className="w-full"
          />
        </div>
        <div className="select-showcase__card">
          <h3>Multi Select</h3>
          <UniversalSelect
            id="language-select"
            label="Languages"
            options={languageOptions}
            multiple
            value={languages}
            onChange={setLanguages}
            placeholder="Select languages"
            searchable
            footerActions
            mobileBehavior="sheet"
          />
        </div>
        <div className="select-showcase__card">
          <h3>Searchable Single Select</h3>
          <UniversalSelect
            id="sort-select"
            label="Sort By"
            options={sortOptions}
            value={sort ?? undefined}
            onChange={setSort}
            searchable
            placeholder="Sort results"
          />
        </div>
        <div className="select-showcase__card">
          <h3>Grouped Options with Icons</h3>
          <UniversalSelect
            id="team-select"
            label="Team Skills"
            options={groupedOptions}
            multiple
            withIcons
            value={team}
            onChange={setTeam}
            placeholder="Select skills"
            footerActions
          />
        </div>
      </div>
    </div>
  );
};
