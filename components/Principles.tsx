/** The five principles as a plain list of titles beside the section heading. */
export function Principles({ items, head }: { items: string[]; head: React.ReactNode }) {
  return (
    <div className="wrap pstack">
      <div className="pstack-head">{head}</div>
      <ul className="plist">
        {items.map((name) => (
          <li key={name} className="rv">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
