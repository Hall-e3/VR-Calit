import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
}) => (
  <div className="flex flex-col space-y-2">
    <input
      id={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={twMerge(
        "w-full border-b border-white/40 focus:outline-none focus:border-white/70 py-2 text-white",
        error && "border-red-500"
      )}
      required={required}
      aria-describedby={error ? `${label}-error` : undefined}
    />
    {error && (
      <p id={`${label}-error`} className="text-red-500 text-sm">
        {error}
      </p>
    )}
  </div>
);

const FormTextarea: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) => (
  <div className="flex flex-col space-y-2">
    <textarea
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={twMerge(
        "w-full border-b border-white/40 focus:outline-none focus:border-white/70 py-2 text-white resize-none",
        error && "border-red-500"
      )}
      required={required}
      aria-describedby={error ? `${label}-error` : undefined}
    />
    {error && (
      <p id={`${label}-error`} className="text-red-500 text-sm">
        {error}
      </p>
    )}
  </div>
);

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validateForm = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!firstName) newErrors.firstName = "First name is required";
    if (!message) newErrors.message = "Message is required";
    if (phoneNumber && !/^\+?\d{7,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
      setFirstName("");
      setLastName("");
      setCompany("");
      setPhoneNumber("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const handleBookCall = () => {
    // Mock action: Open a calendar link or external booking system
    window.open("https://calendly.com/example", "_blank");
  };

  return (
    <section className="bg-black py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold tracking-tight text-white mb-10">
          Let's talk!
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT SIDE: FORM */}
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-5">
              <p className="uppercase font-semibold text-md text-white/40">
                Send the email
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="text-white flex flex-col space-y-10"
            >
              <FormInput
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
                type="email"
                required
                error={errors.email}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First name"
                  value={firstName}
                  onChange={setFirstName}
                  placeholder="First name"
                  required
                  error={errors.firstName}
                />
                <FormInput
                  label="Last name"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Last name"
                  error={errors.lastName}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company"
                  value={company}
                  onChange={setCompany}
                  placeholder="Company"
                  error={errors.company}
                />
                <FormInput
                  label="Phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Phone number"
                  type="tel"
                  error={errors.phoneNumber}
                />
              </div>
              <FormTextarea
                label="Message"
                value={message}
                onChange={setMessage}
                placeholder="Tell us about your project"
                required
                error={errors.message}
              />
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className={twMerge(
                    "w-full bg-white/80 text-black font-bold py-5 sm:py-3 px-8 rounded-4xl sm:rounded-3xl hover:bg-white transition cursor-pointer",
                    status === "submitting" && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={status === "submitting"}
                  aria-label="Submit form"
                >
                  <p className="font-semibold tracking-wide text-sm">
                    {status === "submitting" ? "SENDING..." : "SEND"}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="w-full border border-white/40 py-5 sm:py-3 px-8 rounded-4xl sm:rounded-3xl hover:bg-white/80 hover:text-black transition cursor-pointer"
                  aria-label="Book a call"
                >
                  <p className="font-semibold tracking-wide text-sm">
                    BOOK A CALL
                  </p>
                </button>
              </div>
              {status === "success" && (
                <p className="text-green-500 text-sm">
                  Your message has been sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm">
                  An error occurred. Please try again later.
                </p>
              )}
            </form>
          </div>

          {/* RIGHT SIDE: CONTACT INFO */}
          <div className="flex flex-col space-y-6">
            <div className="border-l border-white/40 pl-8 sm:pl-10 flex flex-col space-y-10">
              <div className="flex flex-col space-y-2">
                <p className="uppercase font-semibold text-md text-white/40 tracking-wider">
                  Write us
                </p>
                <p className="text-white/70 font-bold text-2xl">
                  kymatostechnologies@gmail.com
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="uppercase font-semibold text-md text-white/40 tracking-wider">
                  Call us
                </p>
                <p className="text-white/70 font-bold text-2xl">
                  +256 0760100320
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="uppercase font-semibold text-md text-white/40 tracking-wider">
                  Address
                </p>
                <address className="text-white/70 font-bold text-2xl not-italic">
                  Kampala Serena Conference Center, Suite 348. P.O.Box 162672.
                  Kampala, Uganda.
                </address>
              </div>
            </div>
            <p className="text-white/40 text-xs tracking-tight">
              By submitting this form, you consent to your data being sent to
              contact@vinode.io for review by authorized personnel. We aim to
              respond promptly. To retract your data or if the form was
              submitted in error, please email contact@vinode.io. We maintain
              strict privacy standards and will not share your data with third
              parties or send unsolicited messages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
