import { cn } from '@lib/utils';

export function AuthInput({
  name,
  value,
  type,
  onBlur,
  onChange,
  error,
  children,
}: {
  name: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  error?: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        className={cn(
          'block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer',
          error ? 'border-red-500 text-red-500 focus:border-red-500' : ''
        )}
        placeholder=" "
        required
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={cn(
          'peer-focus:font-medium absolute text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
          error ? 'text-red-500 peer-focus:text-red-500' : ''
        )}
      >
        {children}
      </label>
      {error ? <p className="mt-2 text-red-500 text-sm">{error}</p> : null}
    </div>
  );
}
