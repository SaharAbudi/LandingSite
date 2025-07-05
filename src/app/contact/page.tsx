import ContactForm from '@/components/forms/ContactForm'

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-6">
        Contact Me
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Feel free to reach out using the form below.
      </p>
      <ContactForm />
    </main>
  )
}
