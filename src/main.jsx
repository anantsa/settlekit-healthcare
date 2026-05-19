import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const questions = [
  {
    id: "moveReason",
    label: "Why are you moving to the US?",
    help: "Coverage questions usually start here.",
    options: [
      { value: "work", label: "Work", score: 0 },
      { value: "study", label: "Study", score: 0 },
      { value: "family", label: "Spouse or family", score: 1 },
      { value: "unsure", label: "Not sure yet", score: 1 }
    ]
  },
  {
    id: "coverage",
    label: "Where will your coverage come from?",
    help: "A best guess is fine.",
    options: [
      { value: "employer", label: "Employer", score: 0 },
      { value: "university", label: "University", score: 0 },
      { value: "familyPlan", label: "Family plan", score: 1 },
      { value: "marketplace", label: "Marketplace", score: 1 },
      { value: "unknown", label: "Not sure", score: 2 }
    ]
  },
  {
    id: "healthNeeds",
    label: "Any known health needs before moving?",
    help: "Anything to continue, refill, or schedule after arrival.",
    options: [
      { value: "routine", label: "Routine only", score: 0 },
      { value: "medication", label: "Regular medication", score: 1 },
      { value: "condition", label: "Existing condition", score: 1 },
      { value: "specialist", label: "Specialist care", score: 2 },
      { value: "pregnancy", label: "Pregnancy", score: 2 },
      { value: "notSure", label: "Not sure", score: 1 }
    ]
  },
  {
    id: "terms",
    label: "How familiar are you with US insurance terms?",
    help: "Deductible, network, copay, premium.",
    options: [
      { value: "understand", label: "Comfortable", score: 0 },
      { value: "some", label: "Somewhat", score: 1 },
      { value: "confused", label: "Not at all", score: 2 }
    ]
  },
  {
    id: "coverageStart",
    label: "Do you know when your coverage starts?",
    help: "One of the most useful dates to confirm.",
    options: [
      { value: "yes", label: "Yes", score: 0 },
      { value: "no", label: "No", score: 2 },
      { value: "notSure", label: "Not sure", score: 2 }
    ]
  }
];

const faqItems = [
  {
    question: "What happens if I do not have health insurance?",
    answer:
      "You may face very large medical bills if you get sick or injured. Your university may also block enrollment, require proof of coverage, or automatically enroll you in its own plan."
  },
  {
    question: "Is travel insurance enough for studying in the U.S.?",
    answer:
      "Usually not. Travel insurance is often designed for short trips and emergencies only. It may not cover regular doctor visits, prescriptions, mental health, chronic conditions, or long-term student needs."
  },
  {
    question: "Why should I avoid very cheap discount student insurance?",
    answer:
      "Cheap plans often look attractive, but they may have serious limits. They may not cover enough care, may exclude certain treatments, may not work with local hospitals, or may require you to pay large bills first and request reimbursement later."
  },
  {
    question: "Can I buy insurance outside my university?",
    answer:
      "Sometimes, but be careful. Some schools allow outside insurance only if it meets their requirements. If the plan is not approved, your school may reject it and still charge you for the university plan."
  },
  {
    question: "Should I buy the university health insurance plan?",
    answer:
      "In most cases, yes. Many U.S. colleges have mandatory or approved student health insurance plans. These plans are usually easier to verify, accepted by the school, and designed around student needs. Buying through the university is often safer than choosing a random outside policy."
  },
  {
    question: "What is the safest option for a new international student?",
    answer:
      "Start with your university's international student office or student health insurance page. Compare the approved options first. Only buy an outside plan if you are sure it meets your school's requirements and covers real medical needs in the city where you will study."
  },
  {
    question: "What should I ask my employer or university?",
    answer:
      "Ask when coverage starts, what documents are needed, whether dependents can be added, and how to find doctors in the plan network."
  },
  {
    question: "What should I check before buying a plan?",
    answer:
      "Check the coverage details, deductible, copay, coinsurance, provider network, prescription coverage, emergency coverage, hospitalization, pre-approval rules, and whether the plan is accepted by your university."
  },
  {
    question: "Will my insurance cover pre-existing conditions?",
    answer:
      "Not always. Some plans may limit or exclude coverage for conditions you had before buying the policy. Students with chronic conditions, regular medication, allergies, diabetes, or other ongoing health needs should read this section very carefully."
  },
  {
    question: "Should I bring medication from my home country?",
    answer:
      "Yes, if you have regular medications or a chronic condition, it is wise to bring enough medication legally allowed for your initial stay. U.S. prescriptions and doctor visits can be expensive, and student insurance may have limits."
  },
  {
    question: "What is pre-approval or pre-authorization?",
    answer:
      "Some treatments require approval from the insurance company before you receive care. If you skip this step, the insurance company may deny the claim, even if the treatment would otherwise be covered."
  },
  {
    question: "What does \"in-network\" mean?",
    answer:
      "In-network means the doctor, clinic, or hospital has an agreement with your insurance company. You usually pay much less when you use in-network providers. If you go out-of-network, your insurance may pay less or may not pay at all."
  },
  {
    question: "What are deductible, copay, and coinsurance?",
    answer:
      "A deductible is the amount you pay before insurance starts paying. A copay is a fixed amount you pay for a visit or service. Coinsurance is the percentage you pay after your deductible is met. These costs matter because insurance does not always mean everything is free."
  },
  {
    question: "Is dental care included in student health insurance?",
    answer:
      "Usually, no. Dental care is often separate and can be expensive in the U.S. It is smart to complete dental checkups and necessary dental work before arriving, or buy separate dental coverage if needed."
  },
  {
    question: "Can I add my spouse or child to my student health insurance?",
    answer:
      "Often, yes. If you are bringing dependents, check whether your university plan allows spouse or child coverage. Adding dependents to your student plan may be cheaper and simpler than buying a separate policy."
  },
  {
    question: "What documents might I need?",
    answer:
      "Common items include passport details, visa or immigration documents, employment or enrollment information, and records for prescriptions or ongoing care."
  },
  {
    question: "Will the campus clinic accept my insurance?",
    answer:
      "Usually, the university plan works well with the campus clinic. If you buy outside insurance, check whether you can still use the school clinic and whether visits will be covered."
  },
  {
    question: "What is the Marketplace?",
    answer:
      "The Marketplace is a place to compare and enroll in certain health insurance plans. Eligibility, timing, and costs can vary by state and situation."
  },
  {
    question: "What is health coverage?",
    answer:
      "Health coverage helps pay for medical care. In the US it may come from an employer, university, family plan, Marketplace plan, or another eligible program."
  },
  {
    question: "Does this tool choose a plan for me?",
    answer:
      "No. It helps you organize questions and documents so you can have better conversations with an employer, university, insurer, advisor, or healthcare professional."
  }
];

const resultProfiles = {
  incomplete: {
    level: "Start with the basics",
    tone: "neutral",
    intro: "Answer a few questions and your readiness notes will appear here.",
    prepare: ["Your likely coverage source", "Coverage start date", "Any health needs to plan around"],
    questions: ["Who can confirm your coverage details?", "What documents should you gather before travel?"],
    redFlags: ["No urgent red flags yet. The check will update as you answer."]
  },
  good: {
    level: "Good start",
    tone: "success",
    intro: "You already have a few useful anchors. A little confirmation can make your arrival smoother.",
    prepare: [
      "Save plan or benefits documents in one folder",
      "Confirm your coverage start date in writing",
      "Keep prescription names and recent records available"
    ],
    questions: [
      "How do I find in-network doctors near my new address?",
      "What should I do if I need care before coverage starts?"
    ],
    redFlags: ["Assuming every doctor accepts your plan", "Waiting until arrival to ask about prescriptions"]
  },
  clarify: {
    level: "Needs clarification",
    tone: "warning",
    intro: "You have a direction, but a few details still need daylight before you move.",
    prepare: [
      "Write down who is offering coverage and when it begins",
      "Gather ID, visa, employment, enrollment, or dependent documents",
      "List current medications, doctors, and ongoing care needs"
    ],
    questions: [
      "When exactly does coverage start, and is there a waiting period?",
      "Are dependents eligible, and what documents are required?",
      "What costs should I expect before the plan starts paying?"
    ],
    redFlags: ["Unclear start date", "No plan for regular medication", "Not knowing who can answer benefits questions"]
  },
  prepare: {
    level: "Prepare before landing",
    tone: "risk",
    intro: "It would be wise to clarify several items before travel. This is fixable, and starting now helps.",
    prepare: [
      "Identify your likely coverage path or backup option",
      "Ask about coverage start dates, waiting periods, and dependent eligibility",
      "Prepare records for medication, pregnancy, specialist care, or existing conditions"
    ],
    questions: [
      "Who can confirm my first eligible coverage date?",
      "What should I do if I need urgent care before my coverage begins?",
      "Which services or medications require prior approval?"
    ],
    redFlags: [
      "Arriving with no coverage start date",
      "Stopping medication because refills were not planned",
      "Booking specialist care without checking network or referral rules"
    ]
  }
};

const authorityRoutes = {
  employer: {
    title: "Employer benefits office or plan administrator",
    summary: "Start with HR or the benefits portal tied to your job offer.",
    steps: [
      "Ask HR or the benefits office for your enrollment window, coverage effective date, Summary of Benefits and Coverage, dependent rules, and insurer name.",
      "Complete enrollment in the employer benefits portal or new-hire packet before the deadline. Add dependents with the documents the plan asks for.",
      "After enrollment, download or request the insurance ID card, create the insurer account, and confirm an in-network doctor, pharmacy, urgent care, and prescription coverage.",
      "If coverage starts after you arrive, check HealthCare.gov or a state Marketplace for a possible Special Enrollment Period or short gap plan options."
    ]
  },
  university: {
    title: "University student insurance office",
    summary: "Start with the international student office, student health center, or school insurance portal.",
    steps: [
      "Ask whether the university plan is required, optional, or waivable, and confirm the enrollment or waiver deadline.",
      "Enroll through the school insurance portal, or submit a waiver only if your other coverage meets the school's requirements.",
      "Download your insurance card, learn whether care starts at the student health center, and ask when referrals are needed for outside doctors.",
      "If dependents are not covered or your waiver is denied, check HealthCare.gov or your state Marketplace for other coverage routes."
    ]
  },
  familyPlan: {
    title: "Family plan sponsor or insurer",
    summary: "Start with the spouse/family member's employer benefits office or the insurer that runs the plan.",
    steps: [
      "Ask whether you can be added as a dependent, what event or document makes you eligible, and the deadline for adding you.",
      "Submit the requested dependent documents, such as marriage or family relationship proof, identity documents, and immigration or residency details if requested.",
      "Confirm the effective date, premium change, member ID card, network, and whether prescriptions or specialists need approval.",
      "If the plan cannot add you or starts too late, check HealthCare.gov or a state Marketplace for another coverage route."
    ]
  },
  marketplace: {
    title: "Health Insurance Marketplace at HealthCare.gov or your state Marketplace",
    summary: "Use this route when you do not have employer, university, or family coverage arranged.",
    steps: [
      "Go to HealthCare.gov and choose Apply for coverage. Create or log in to your account. If your state uses its own Marketplace, HealthCare.gov will point you there.",
      "Complete the application with your household, new address, income estimate, immigration or visa information, and any employer coverage offer.",
      "If it is outside Open Enrollment, answer the Special Enrollment Period questions. Moving to the U.S. from a foreign country or U.S. territory may qualify.",
      "Review eligibility results, compare plans, enroll, and pay the first premium to the insurance company so coverage can start.",
      "If the application says you may qualify for Medicaid or CHIP, follow the state agency instructions. Medicaid eligibility is determined by your state agency."
    ]
  },
  unknown: {
    title: "Start with your sponsor, then use the Marketplace if needed",
    summary: "Your first job is to identify who can actually enroll you.",
    steps: [
      "If you are moving for work, ask employer HR. If you are moving for study, ask the university insurance office. If coverage may come through family, ask that plan sponsor.",
      "Get the answer in writing: coverage source, enrollment deadline, effective date, dependents, premium, and required documents.",
      "If no sponsor coverage is available or the start date leaves a gap, go to HealthCare.gov or your state Marketplace and complete an application.",
      "If the Marketplace routes you to Medicaid or CHIP, contact the state Medicaid agency listed in your notice or through Medicaid.gov."
    ]
  }
};

function getResult(answers) {
  const answeredCount = Object.keys(answers).length;

  if (answeredCount < questions.length) {
    return resultProfiles.incomplete;
  }

  const score = questions.reduce((total, question) => {
    const selected = question.options.find((option) => option.value === answers[question.id]);
    return total + (selected?.score ?? 0);
  }, 0);

  if (score <= 2) {
    return resultProfiles.good;
  }

  if (score <= 5) {
    return resultProfiles.clarify;
  }

  return resultProfiles.prepare;
}

function getAuthorityRoute(answers) {
  if (answers.coverage && answers.coverage !== "unknown") {
    return authorityRoutes[answers.coverage] ?? authorityRoutes.unknown;
  }

  return authorityRoutes.unknown;
}

function buildHealthReport(answers, result) {
  const route = getAuthorityRoute(answers);
  const checklist = [
    "Confirm your exact coverage start date before booking non-urgent care.",
    "Save your insurance ID card, member number, and insurer login once enrolled.",
    "Find an in-network primary care doctor, urgent care, hospital, and pharmacy near your new address."
  ];
  const documents = [
    "Passport, visa, I-94 or other immigration/status document",
    "U.S. address, phone number, and email you can access after arrival",
    "Employer offer, university enrollment, or dependent/family plan documents",
    "Income estimate or pay information if you apply through the Marketplace or Medicaid route"
  ];
  const watch = [
    "Do not assume coverage starts on your arrival date. Confirm the effective date.",
    "Keep every notice from the Marketplace, state Medicaid agency, employer, university, or insurer.",
    "If any authority asks for documents, upload or submit them before the deadline."
  ];

  if (["medication", "condition", "specialist", "pregnancy"].includes(answers.healthNeeds)) {
    checklist.push("Use the insurer directory to find the right doctor type and ask whether referrals or prior approval are needed.");
    documents.push("Medication list, dosage, recent records, and provider notes for ongoing care");
    watch.push("Do not wait until medication runs out to check refills, formulary rules, or pharmacy network.");
  }

  if (answers.healthNeeds === "pregnancy") {
    checklist.push("After arrival, contact an in-network OB-GYN or prenatal care office and ask the insurer about pregnancy coverage rules.");
  }

  if (answers.terms === "confused") {
    checklist.push("Ask the benefits office, Marketplace assister, or insurer to explain premium, deductible, copay, coinsurance, network, and out-of-pocket maximum.");
  }

  if (answers.coverageStart !== "yes") {
    checklist.unshift("Make coverage start date your first question with the authority or plan sponsor.");
    watch.unshift("A coverage gap can happen if enrollment is late or the first premium is not paid.");
  }

  return {
    route,
    checklist,
    documents,
    watch,
    intro: result.intro
  };
}

function escapeCalendarText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadCalendarReminder(report) {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  const description = [
    report.route.summary,
    "Checklist:",
    ...report.checklist.slice(0, 3).map((item) => `- ${item}`)
  ].join("\n");

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SettleKit//Healthcare Readiness//EN",
    "BEGIN:VEVENT",
    `UID:settlekit-healthcare-${Date.now()}@settlekit`,
    `DTSTAMP:${toCalendarDate(new Date())}`,
    `DTSTART:${toCalendarDate(start)}`,
    `DTEND:${toCalendarDate(end)}`,
    "SUMMARY:SettleKit healthcare reminder",
    `DESCRIPTION:${escapeCalendarText(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Review your SettleKit healthcare plan",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "settlekit-healthcare-reminder.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function App() {
  const [answers, setAnswers] = useState({});
  const [openFaq, setOpenFaq] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const result = useMemo(() => getResult(answers), [answers]);
  const report = useMemo(() => buildHealthReport(answers, result), [answers, result]);
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const canAnalyze = answeredCount === questions.length;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectOption = (questionId, value) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header
        className="sticky top-0 z-10 w-full border-b bg-[rgba(250,250,249,0.8)] backdrop-blur-md"
        style={{ borderColor: "var(--line)" }}
        aria-label="SettleKit Healthcare header"
      >
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5 sm:px-6">
          <a className="flex items-center gap-2" href="#check" aria-label="SettleKit Healthcare checklist">
            <img className="size-7 object-contain" src="/logo.png" alt="" aria-hidden="true" />
            <span className="text-[14px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
              SettleKit
            </span>
            <span className="text-[13px]" style={{ color: "var(--ink-3)" }}>
              Healthcare
            </span>
          </a>
          <a
            className="text-[13px] font-medium transition-colors hover:text-[var(--ink)]"
            href="#faqs"
            style={{ color: "var(--ink-2)" }}
          >
            FAQ
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <section className="pb-10 pt-16" id="check" aria-labelledby="check-title">
          <h1
            id="check-title"
            className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[52px]"
            style={{ color: "var(--ink)" }}
          >
            Healthcare <span style={{ color: "var(--accent)" }}>readiness</span>,
            <br />
            <span style={{ color: "var(--ink-3)" }}>before you arrive.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
            Five short questions. We will show you what to set up, what to ask, and in what order - tailored to
            your situation.
          </p>
        </section>

        <section aria-label="Healthcare readiness questions">
          <div
            className="sticky top-14 z-[5] -mx-5 bg-[rgba(250,250,249,0.85)] px-5 py-3 backdrop-blur-md sm:-mx-6 sm:px-6"
            style={{ borderColor: "var(--line)" }}
            aria-label={`${progress}% complete`}
          >
            <div className="flex items-center justify-between text-[12px]" style={{ color: "var(--ink-3)" }}>
              <span>
                <span className="font-semibold tabular-nums" style={{ color: "var(--ink)" }}>
                  {answeredCount}
                </span>{" "}
                of {questions.length} answered
              </span>
              <span
                className="font-medium tabular-nums"
                style={{ color: progress > 0 ? "var(--accent)" : "var(--ink-3)" }}
              >
                {progress}%
              </span>
            </div>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--line)" }}>
              <span
                className="block h-full rounded-full transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }}
              />
            </div>
          </div>

          <div className="mt-8">
            {questions.map((question, index) => (
              <section
                className="border-t py-7 first:pt-2 first:border-t-0"
                style={{ borderColor: "var(--line)" }}
                key={question.id}
                role="group"
                aria-labelledby={`${question.id}-title`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] font-medium tabular-nums" style={{ color: "var(--ink-3)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[16px] font-semibold leading-snug tracking-tight"
                    style={{ color: "var(--ink)" }}
                    id={`${question.id}-title`}
                  >
                    {question.label}
                  </h3>
                </div>
                <p className="ml-7 mt-1.5 max-w-md text-[13.5px] leading-relaxed" style={{ color: "var(--ink-3)" }}>
                  {question.help}
                </p>
                <div className="ml-7 mt-4 flex flex-wrap gap-2">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.value;
                    return (
                      <button
                        className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-150"
                        style={{
                          backgroundColor: selected ? "var(--ink)" : "var(--surface)",
                          borderColor: selected ? "var(--ink)" : "var(--line-2)",
                          color: selected ? "var(--bg)" : "var(--ink-2)"
                        }}
                        type="button"
                        key={option.value}
                        aria-pressed={selected}
                        onClick={() => selectOption(question.id, option.value)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div
            className="mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
                Get your readiness report
              </p>
              <p className="mt-1 text-[13.5px]" style={{ color: "var(--ink-3)" }}>
                {canAnalyze ? "Ready when you are." : `Answer ${questions.length - answeredCount} more to continue.`}
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-semibold transition-all disabled:cursor-not-allowed"
              style={{
                backgroundColor: canAnalyze ? "var(--ink)" : "var(--line)",
                color: canAnalyze ? "var(--bg)" : "var(--ink-3)"
              }}
              type="button"
              disabled={!canAnalyze}
              onClick={() => setShowReport(true)}
            >
              See my report
              <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </section>

        <section className="mt-24 scroll-mt-20 pb-16" id="faqs" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-[28px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
            Frequently asked
          </h2>
          <p className="mt-2 text-[14px]" style={{ color: "var(--ink-3)" }}>
            Short answers to the most common questions.
          </p>

          <ul className="mt-8">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <li
                  className="border-t last:border-b"
                  style={{ borderColor: "var(--line)" }}
                  key={item.question}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span
                      className="text-[14.5px] font-medium tracking-tight transition-colors"
                      style={{ color: isOpen ? "var(--accent)" : "var(--ink)" }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="grid size-4 shrink-0 place-items-center text-[18px] leading-none transition-transform duration-200"
                      style={{
                        color: isOpen ? "var(--accent)" : "var(--ink-3)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                  >
                    <p className="pb-5 pr-8 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
                      {item.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-6 text-[12.5px] sm:px-6" style={{ color: "var(--ink-3)" }}>
          <span>SettleKit</span>
          <span>Educational guidance - not medical or legal advice.</span>
        </div>
      </footer>

      {showReport && (
        <ReportDialog
          report={report}
          result={result}
          onClose={() => setShowReport(false)}
          onReviewAnswers={() => {
            setShowReport(false);
            scrollToSection("check");
          }}
        />
      )}
    </main>
  );
}

const toneClasses = {
  neutral: "border-[var(--line)]",
  success: "border-[var(--sk-success-border)]",
  warning: "border-[var(--sk-warning-border)]",
  risk: "border-[var(--sk-risk-border)]"
};

function ReportDialog({ report, result, onClose, onReviewAnswers }) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[var(--sk-dialog-backdrop)] px-4 py-6"
      role="presentation"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <section
          className={`w-full max-w-2xl rounded-lg border bg-[var(--surface)] p-5 shadow-[0_24px_80px_rgba(10,10,10,0.18)] sm:p-6 ${toneClasses[result.tone]}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="inline-flex rounded-full border px-3 py-1.5 text-[12px] font-medium"
                style={{ borderColor: "var(--line)", color: "var(--accent)" }}
              >
                SettleKit healthcheck report
              </div>
              <h2
                id="report-title"
                className="mt-4 text-[28px] font-semibold leading-tight tracking-tight"
                style={{ color: "var(--ink)" }}
              >
                Your after-arrival healthcare roadmap.
              </h2>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
                Readiness level: <span className="font-semibold" style={{ color: "var(--ink)" }}>{result.level}</span>. {report.intro}
              </p>
            </div>
            <button
              className="grid size-8 shrink-0 place-items-center rounded-md border text-[16px] font-medium transition-colors hover:text-[var(--ink)]"
              style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}
              type="button"
              aria-label="Close report"
              onClick={onClose}
            >
              x
            </button>
          </div>

          <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--line)" }}>
            <p className="text-[13px] font-medium" style={{ color: "var(--accent)" }}>SettleKit plan</p>
            <h3 className="mt-2 text-[20px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
              You need to start with: {report.route.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }}>{report.route.summary}</p>

            <ol className="mt-5 grid gap-3">
              {report.route.steps.map((step, index) => (
                <li className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: "var(--ink-2)" }} key={step}>
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-full text-[12px] font-semibold"
                    style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <button
              className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-lg px-4 py-2.5 text-[13.5px] font-semibold sm:w-auto"
              style={{ backgroundColor: "var(--ink)", color: "var(--bg)" }}
              type="button"
              onClick={() => downloadCalendarReminder(report)}
            >
              <MobileIcon className="mr-2 size-4 shrink-0" />
              Add plan to my calendar
            </button>
          </div>

          <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--line)" }}>
            <h3 className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--ink)" }}>Your checklist</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <ReportList title="After arrival" items={report.checklist} />
              <ReportList title="Keep ready" items={report.documents} />
              <ReportList title="Do not miss" items={report.watch} />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="inline-flex min-h-10 items-center justify-center rounded-lg border px-4 py-2.5 text-[13.5px] font-semibold"
              style={{ borderColor: "var(--line-2)", color: "var(--ink-2)" }}
              type="button"
              onClick={onReviewAnswers}
            >
              Review answers
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MobileIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="12" height="20" x="6" y="2" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function ReportList({ title, items }) {
  return (
    <section>
      <h3 className="text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>{title}</h3>
      <ul className="mt-3 grid gap-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-2)" }}>
        {items.map((item) => (
          <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-[var(--accent)]" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
