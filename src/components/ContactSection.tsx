import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";

interface FormInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  name,
  type = "text",
  required = false,
  error,
}) => (
  <div className="flex flex-col space-y-2">
    <input
      id={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
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
  name,
  required = false,
  error,
}) => (
  <div className="flex flex-col space-y-2">
    <textarea
      id={label}
      name={name}
      value={value}
      onChange={onChange}
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
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    message: "",
    subject: "",
  });

  useEffect(() => {
    emailjs.init("vuJFdIr4h2PRxJACG");
  }, []);

  const validateForm = () => {
    const { email, firstName, message, phoneNumber } = values;
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookCall = () => {
    window.open("https://calendly.com/example", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus("submitting");

    const serviceId = "service_d2jezqk";
    const templateId = "template_y7in2pe";

    try {
      await emailjs.send(serviceId, templateId, {
        user_name: `${values.firstName} ${values.lastName}`,
        user_email: values.email,
        subject: values.subject || "New Message",
        message: values.message,
        phone: values.phoneNumber,
        company: values.company,
      });

      setStatus("success");
      setMessage("Your message has been sent successfully!");
      setValues({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        phoneNumber: "",
        message: "",
        subject: "",
      });
    } catch (error) {
      console.error("Email send error:", error);
      setStatus("error");
      setMessage("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <section className="bg-black py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold tracking-tight text-white mb-10">
          Let's talk!
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col space-y-5">
            <p className="uppercase font-semibold text-md text-white/40">
              Send the email
            </p>
            <form
              onSubmit={handleSubmit}
              className="text-white flex flex-col space-y-10"
            >
              <FormInput
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="Email"
                type="email"
                required
                error={errors.email}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  required
                  error={errors.firstName}
                />
                <FormInput
                  label="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  error={errors.lastName}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company"
                  name="company"
                  value={values.company}
                  onChange={handleInputChange}
                  placeholder="Company"
                  error={errors.company}
                />
                <FormInput
                  label="Phone number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  type="tel"
                  error={errors.phoneNumber}
                />
              </div>
              <FormTextarea
                label="Message"
                name="message"
                value={values.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project"
                required
                error={errors.message}
              />
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className={twMerge(
                    "w-full bg-white/80 text-black font-bold py-5 sm:py-3 px-8 rounded-4xl sm:rounded-3xl hover:bg-white transition cursor-pointer",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={loading}
                  aria-label="Submit form"
                >
                  <p className="font-semibold tracking-wide text-sm">
                    {loading ? "SENDING..." : "SEND"}
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
              {message && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
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
                  +256760100320
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
              contact@vinode.io for review by authorized personnel...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
