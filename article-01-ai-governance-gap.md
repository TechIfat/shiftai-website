# The AI Governance Gap: UK Banks Are Deploying AI Faster Than They Can Govern It

Ten. That is how many banks the FCA has fined for financial crime control failings in the last four years. Monzo, £21 million. Starling, £29 million. Metro Bank, £16.7 million. Different banks, different products, different years. Read the final notices side by side and one pattern holds across all of them.

The controls were not absent. They existed, they ran, and everyone assumed they worked.

Metro Bank automated its transaction monitoring in 2016. A data feed error meant transactions made on the day an account was opened were never monitored. Junior staff raised concerns in 2017 and 2018. The issue was not fixed, and even after a fix arrived in 2019, there was no mechanism to check the system was receiving everything it should until December 2020. Over 60 million transactions worth more than £51 billion went unmonitored, for four and a half years, inside a system everyone believed was working.

Starling's sanctions screening was misconfigured for years before an internal review found it. Monzo's onboarding controls did not keep pace as its customer base grew almost tenfold, and accounts were opened against addresses like Buckingham Palace.

None of these was an AI failure. They were automation failures, and specifically failures of a particular kind: the distance between what a control actually did and what the institution assumed it did. Nobody was checking the checker.

Now hold that pattern in mind, because UK banks are currently deploying a new generation of automation that is harder to inspect than anything in those final notices.

## The question is changing shape

The Bank of England's February 2026 summary of its 2025 AI roundtables makes for uncomfortable reading if you are responsible for AI-assisted decisions in a regulated firm. The concerns raised by participants were not about whether AI works. They were about whether firms can evidence how it works: whether outputs can be traced, whether behaviour can be explained after the fact, and whether anyone can say with confidence what a model did in a specific case months earlier.

That is the shape of the shift. For the last decade, the question a bank asked its technology teams was "can the AI do this?" The question a regulator asks is different: "can you prove exactly how and why it did it, in this specific case, to this specific customer?"

Those are not the same question, and most AI deployments in UK finance today are built to answer the first one.

There is a reason to believe the second question arrives sooner rather than later. The Senior Managers and Certification Regime already requires a named individual to be accountable for the systems and controls in their area. When an AI-assisted credit decision is challenged, the SMF who signed off on that decisioning process will be asked how they satisfied themselves it was sound. "The model is generally accurate" is not an answer that survives that conversation. The enforcement record above shows what happens to "we assumed it worked."

## What the gap looks like up close

Abstract arguments about AI governance are easy to nod along to and easy to defer. So here is a concrete case, from my own work, with the numbers left in.

I build governance infrastructure for AI-assisted credit decisions. Earlier this month, ComplyAI, the system I have spent this year building, went through an independent audit round. One of the findings was a new check the auditor recommended: verify every citation the model produces, word for word, against the source document it claims to quote.

The check was built. Then it was run against the system's own test fixtures, the synthetic credit files used to prove the pipeline works.

It caught a fabricated citation that was already sitting there.

The model had cited a debt service coverage ratio of 1.42, attributed to a specific financial statement. The statement said 1.35. Both numbers are plausible. Both would pass a glance. The citation named a real document and quoted it with complete confidence, and it had passed every earlier review, including mine, because nobody re-checks a specific number attributed to a specific document. That is precisely why the failure mode is dangerous.

I want to be precise about what this was and was not. It was synthetic data, not a customer's file. It was caught in an audit, which is what audits are for. But the mechanism is the one that matters: a large language model, asked to ground its output in source documents, produced a nearly right number with a confident attribution, and every layer of human review above it inherited the error. If your bank is using AI to read financial statements, draft credit memos, or summarise customer files, this is happening in your pipeline. The only question is whether anything is positioned to catch it.

The fix, for what it is worth, was not more prompting or a better model. It was deterministic verification: every cited span is now compared verbatim against the source text before a figure can be marked as traced, and anything that fails is downgraded and routed to a named human reviewer. It can never pass silently. The check is dumb, mechanical, and impossible to charm.

## Four questions that define the gap

Strip away the vendor language and AI governance in a regulated lending context reduces to four questions. They are worth putting to your own teams exactly as written.

**Can every figure in an AI-assisted decision be traced, verbatim, to a source document?** Not "the model cites its sources." Cited and verified are different things, as the 1.42 above demonstrates. If nothing in your stack compares the model's quotes against the actual source text, your citations are decoration.

**Is the record of the decision tamper-evident, and do you know precisely what that guarantee covers?** Every vendor says tamper-evident. The useful question is: tamper-evident against which tampering? A hash-chained log proves its interior has not been altered. On its own it cannot prove entries were never removed from the end. That distinction sounds academic until a regulator asks whether your audit trail is complete, and it is exactly the kind of assumed-versus-actual gap that cost Metro Bank £16.7 million.

**Can the decision be explained honestly, including what could not be verified?** AI-generated explanations have a systematic bias: they are fluent, reassuring, and quietly incomplete, because adverse findings do not read well. Under Consumer Duty, a customer explanation that omits what the system could not verify is not an explanation. The structural fix is to take that choice away from the model, so that limitations are built from verified ground truth in code, and the model cannot drop bad news because the bad news was never its to drop.

**Is there a named individual who signed off, and would their sign-off survive scrutiny?** SMCR already answers who is accountable. The open question in most AI deployments is whether the accountability is real: whether the record of who approved what is itself protected, and whether the approval gate holds under real operating pressure rather than just on the org chart.

If your firm can answer all four with evidence rather than assurance, you are ahead of most of the market. If any of them produced a pause, that pause is the governance gap, and it is worth sizing now, deliberately, rather than in response to a Section 166 notice.

## Building fast and governing slowly

None of this is an argument against deploying AI in credit and risk. The productivity case is real and the banks that sit it out will lose to the banks that do not. The argument is narrower: the enforcement record of the last four years shows that UK regulators fine the gap between assumed and actual control behaviour, they fine it heavily, and they have said publicly that financial crime and systems oversight remain priorities.

AI widens that gap by default, because AI systems are more capable, more fluent, and more confident than the automation in any of those final notices. The fabricated 1.42 did not look like a failure. It looked like a well-sourced fact. Governing systems like that requires controls that do not take the model's word for anything: verbatim verification, tamper-evident records with honestly stated guarantees, deterministic handling of adverse findings, and named human sign-off that cannot be quietly rewritten.

That is buildable. I know because I have spent this year building it, auditing it, and being genuinely surprised by what the audits found in my own work. The firms that treat those surprises as a reason to look harder, rather than a reason to look away, are the ones whose AI deployments will still be standing when the question changes shape.

---

*Ifat Noreen is the founder of ShiftAi Systems Ltd, a UK consultancy building deterministic AI governance for regulated finance, and the architect of ComplyAI, a four-layer compliance governance system for banks deploying AI in credit and risk decisions. The fabricated citation case, and the audit trail behind it, is written up at shiftaiconsulting.co.uk/complyai.html.*
