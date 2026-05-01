import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/35 to-transparent" />
        <div className="relative space-y-5 px-8 py-20 sm:px-12 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">MessePilot</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Trade fair planning made simple.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            MessePilot helps users plan trade fairs, manage booths, notes, tasks, contacts, photos,
            videos and documents.
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
        <Link
          href="mailto:support@messepilot.ch?subject=MessePilot%20Beta%20Access%20Request&body=Hello%20MessePilot%20Team%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20MessePilot%20beta.%0A%0AName%3A%0ACompany%3A%0ARole%3A%0ACountry%3A%0ADevice%3A%0AReason%20for%20beta%20access%3A%0A%0AI%20understand%20that%20MessePilot%20is%20currently%20in%20private%20beta.%20I%20agree%20not%20to%20publicly%20share%20screenshots%2C%20unpublished%20features%2C%20internal%20test%20details%20or%20access%20links%20without%20prior%20permission.%0A%0ABest%20regards%0A"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Request Beta Access
        </Link>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          MessePilot is currently in private beta. Access is reviewed manually.
          By requesting access, you agree that the information you provide may
          be used to review your beta request, contact you about MessePilot and
          manage your beta access. You also agree not to publicly share
          screenshots, unpublished features, internal test details or access
          links without prior permission.
        </p>
      </div>
    </section>
  );
}
