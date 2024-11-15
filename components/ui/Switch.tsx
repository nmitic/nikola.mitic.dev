interface SwitchProps {
  onSwitch: (isSwitched: boolean) => void;
  switched: boolean;
  label: string;
}

export const Switch = ({ onSwitch, switched, label }: SwitchProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer print:hidden">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => {
          onSwitch(switched);
        }}
        checked={switched}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray"></div>
      <span className="ml-3 text-sm font-medium uppercase">{label}</span>
    </label>
  );
};
