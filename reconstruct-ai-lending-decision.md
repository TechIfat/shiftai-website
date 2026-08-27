---
title: "The Only Question That Gets Asked: Can You Reconstruct One AI-Assisted Decision?"
description: "The FCA's Mills Review says the framework holds and accountability does not move. A four-part scored test for whether a single AI-assisted lending decision can actually be evidenced."
author: "Ifat Noreen, ShiftAi Systems Ltd"
published: 2026-08-26
category: "AI Governance"
reading_time: "13 min"
og_image: "https://shiftaiconsulting.co.uk/reconstruct-decision-card.png"
---

# The Only Question That Gets Asked: Can You Reconstruct One AI-Assisted Decision?

**Ifat Noreen** · Founder and Principal Agentic AI Architect, ShiftAi Systems Ltd · 26 August 2026

On 6 July 2026 the FCA published the Mills Review, led by its executive director Sheldon Mills, drawing on more than 140 written submissions and a survey of over 5,000 UK adults. It is the most consequential thing the regulator has said about AI in retail financial services, and its central conclusion is one that many firms have read as reassurance.

There will be no AI-specific rulebook. The Consumer Duty, the Senior Managers Regime and the operational resilience framework were judged a credible foundation for an AI-enabled financial system. Accountability does not move as AI takes on more of the work.

I would read that second sentence again before treating it as good news.

If no new regime is coming, then the existing one is the one you will be examined under, and it was written on the assumption that a firm can show its working. Freshfields, writing on the Review in July, put the practical consequence more plainly than the Review itself does: senior managers should take steps to ensure they can evidence how they maintain meaningful oversight of AI-mediated decisions, particularly where the basis for those decisions is not easily reconstructed.

That final clause is the whole problem, and it is where I want to spend this article.

## Frameworks are institutional. UK enforcement is individual.

Most AI governance discussion I see starts with a framework. Someone has read the EU AI Act and wants to know whether it reaches them. Someone else has been asked by the board about ISO/IEC 42001. There is usually a register, often a policy, sometimes a maturity assessment with a heat map in it. The work is real and the intent is serious.

Then the question changes to one decision. A specific one. A customer, an application, a date, preferably an adverse outcome. What did the model see, can you prove the record has not changed, why was the outcome what it was, and who owned it.

The conversation changes shape immediately, because that is the question that actually gets asked when something goes wrong, and almost nothing in the framework layer answers it.

The asymmetry is this. A framework describes an organisation. It says the firm maintains a register, tiers its use cases, approves them through a defined route and reports to a committee. All of that is addressed to the institution.

UK financial services regulation does not stop at the institution. Under the Senior Managers and Certification Regime a named individual holds a Statement of Responsibilities, and under the Duty of Responsibility can be held personally accountable where a breach occurs in their area and they did not take reasonable steps to prevent it. The Consumer Duty requires firms to evidence good outcomes, not to assert them. For PRA-regulated banks, SS1/23 sets expectations for identification, governance, development, independent validation and mitigation of model risk, and firms have generally read those expectations as reaching AI and machine learning models that inform material decisions.

None of those frameworks was written with language models in mind. All of them apply to one anyway.

The Treasury Select Committee made the direction explicit in January 2026, asking the FCA to publish practical guidance by the end of this year on the level of assurance expected from senior managers for harm caused through the use of AI. Whatever that guidance says, it will be addressed to individuals, and it will be about evidence.

So a firm can hold a certification, run a governance office, produce a monthly board report, and still be unable to answer a question about one customer on one date. The certification describes the process. The question is about the record.

I wrote in an earlier piece about the FCA's recent enforcement pattern across Metro Bank, Starling and Monzo, and the thread running through all of it: the controls were not absent. They existed and they ran. The gap sat between what a control actually did and what the institution assumed it did.

The AI version of that gap sits between a governance framework that looks complete and an evidence record that cannot be reconstructed.

## For readers who do not spend their days in this

If your interest here is regulatory rather than technical, two paragraphs will do.

When an AI system helps make a decision about a customer, four separate things have to be recoverable afterwards, and most firms retain only the last of them. What information the system was given. Whether the record of what happened has been altered since. Why the outcome was what it was, in terms that can be checked against something. And which human being owned the outcome.

The reason all four are needed together is that each one props up the others. An explanation you cannot trace to inputs is a story. Inputs you cannot prove are unchanged are an assertion. A tamper-evident record of an unexplained decision tells you faithfully that something happened for reasons nobody captured. And all three are of limited use if no individual's name is attached, because in the UK the accountability lands on a person.

## The test

Take one real AI-assisted decision from six months ago. Not a representative one. A specific one, and preferably an adverse outcome, because those are the ones that get examined.

Then time how long the organisation takes to produce four things: the exact inputs the model received in the version it received them, proof that the decision record has not been altered since, a reasoned explanation in which every factual claim is tied to a retained input, and the name of the individual who approved it.

I call this the reconstruction drill, and I use it in preference to a maturity assessment for one reason. It produces a fact rather than an opinion. Nobody argues with a stopwatch.

In the systems I have built and audited, the first item takes days. The second is frequently impossible in principle, because the record lives in a database that any administrator can edit. The third produces a rationale that reads beautifully and cannot be checked against anything. The fourth often returns a team name.

## The rubric

Score each dimension from 0 to 3. I have written the criteria to be specific enough that two people applying them to the same decision reach the same score, which is the test any tiering rubric should have to pass.

### Provenance: can you produce exactly what the model saw?

| Score | Criteria |
|---|---|
| **0** | No record of model inputs. Only the output was retained. |
| **1** | Inputs are named but not retained. You can establish that filed accounts and a credit file were used. You cannot produce the versions that were used. |
| **2** | Inputs are retained but not pinned. The source documents still exist, and may have been superseded, re-scanned or corrected since the decision. |
| **3** | Every input is retained with a content hash computed at the time of the decision, verifiable against the stored artefact today. If a document has changed, the mismatch is detectable. |

The distance between 2 and 3 is the one firms consistently underestimate. A document store holding the latest version of a customer's accounts does not tell you which version the model read in March. Where a figure was later corrected, the difference between those two states can be the entire substance of the complaint.

### Auditability: can you prove the record has not changed?

| Score | Criteria |
|---|---|
| **0** | No decision log, or logging at application error level only. |
| **1** | Application logs exist. They are mutable by anyone with database access and subject to a retention policy shorter than the complaint window. |
| **2** | An append-only decision log with timestamps. Entries are not deleted, but there is no cryptographic linkage between them, so a silently inserted or edited entry would not be detectable. |
| **3** | A hash-chained log in which each entry commits to the hash of the previous one. The chain is verifiable end to end on demand, and tampering produces a detectable break at a known position. |

A firm at level 2 can say its records are complete. A firm at level 3 can prove it. That distinction decides the credibility of every other record you hold, because they all rest on this one.

There is a further point that belongs here and is easy to miss. If the integrity check runs inside the application that writes the log, and verifies against an anchor stored beside the log, it protects nothing. The check has to run somewhere the writing process cannot reach.

### Explainability: can you explain why, in terms that can be checked?

| Score | Criteria |
|---|---|
| **0** | The output alone. A decision and a score, with no rationale. |
| **1** | A free-text rationale generated by the model at the time, retained but never verified against the source material. |
| **2** | A rationale containing citations to source documents. The citations are recorded but not verified, so a citation to a page that does not contain the quoted figure would pass unnoticed. |
| **3** | Every factual claim traced to a retained input. Quoted material verified verbatim against the source before the record is written. Claims that cannot be supported are flagged as unsupported rather than silently dropped. The record is generated deterministically, so producing it twice from the same findings produces the same text. |

This is where most AI governance programmes stop, and it is the step that matters most.

A model asked to justify a decision will produce a fluent justification. Fluency is not support. A rationale citing section 4 of a set of accounts for a figure that appears nowhere in them is worse than no rationale at all, because it survives casual review and fails under examination. The verification has to be mechanical and it has to happen before the record is written, not after somebody complains.

The determinism requirement is separate and equally important. If asking the system to explain the same decision twice produces two differently worded answers, you do not have an explanation. You have a generator.

### Accountability: can you name the person who owned it?

| Score | Criteria |
|---|---|
| **0** | No named individual. The decision is attributed to a system or a process. |
| **1** | A team or function owns the decision type. No individual is identified for the specific decision. |
| **2** | A named individual approved it, recorded in a system separate from the decision record, with no cryptographic link between the two. |
| **3** | The approving individual's identity is committed into the audit record at the moment of approval, so the approval cannot be reattributed later. The individual sits within a Senior Manager's Statement of Responsibilities, and the record cannot be finalised twice. |

Level 2 is where most firms sit, and it is weaker than it looks. If approvals live in a workflow tool and decisions live in a lending system, the link between them is a database reference that somebody with the right access can change. Committing the approver's identity into the same tamper-evident chain as the decision closes that.

This dimension is also the one that ages worst. The Mills Review describes an autonomy spectrum along which the human role moves from operator, to collaborator, to consultant, and further still. Every step along it widens the distance between the person named in the Statement of Responsibilities and the action taken in their name. The evidence has to close that distance, because the regime does not.

### Scoring

| Total | What it means |
|---|---|
| **10 to 12** | A decision-level supervisory question can be answered from your records within hours. Work on coverage across systems rather than depth in one. |
| **8 to 9** | Reconstruction is possible but manual, and depends on particular individuals being available. Close the weakest dimension before it becomes urgent. |
| **5 to 7** | You can describe what happened. You cannot evidence it. A skilled person review would find this. |
| **0 to 4** | A specific decision cannot currently be reconstructed. Any AI system in a customer outcome path carries exposure that is not visible on a risk register. |

Score every AI system that touches a customer outcome separately. Averages hide the one that will be examined.

## A worked example

The example below is constructed rather than drawn from an engagement. The figures and the applicant are invented. The failure mode is the one this rubric was built to catch.

A commercial mortgage application, facility of 2.4 million pounds, secured on a mixed-use property. An AI-assisted affordability assessment extracts figures from filed accounts and management information, computes a debt service coverage ratio, and recommends decline on the basis that projected DSCR falls below the credit policy floor of 1.35.

Eleven months later the applicant complains, having refinanced elsewhere on better terms. The complaint asserts that the lender used the wrong turnover figure.

The firm can produce the decision record, the recommendation, the DSCR, and a rationale reading in part that the applicant's most recent filed accounts show turnover materially below the level assumed in the applicant's own projections.

The firm cannot produce the version of the accounts that was used. The accounts were amended and refiled two months after the decision. The document store holds the amended version. Nobody can now establish which figures drove the outcome.

Against the rubric: provenance scores 2, because the documents were retained but not pinned. Auditability scores 2, because the log is append-only but unchained, so a challenge to its integrity cannot be rebutted with evidence. Explainability scores 2, because the rationale cites the accounts and nobody verified that the quoted turnover figure appears in them. Accountability scores 2, because a credit officer approved the recommendation in a workflow tool linked to the decision by an ordinary database reference.

Eight out of twelve. A defensible process and an indefensible record.

At level 3 the same complaint is settled in minutes. The content hash of the accounts as read on the decision date, checked against the version the applicant says should have been used. A chain-verified log entry proving the record has not been altered. A rationale in which the turnover figure was verified verbatim against the retained document before the record was written. An approval committed into the chain under the credit officer's name, mapped to the Senior Manager whose Statement of Responsibilities covers commercial lending.

The complaint might still be upheld on the merits. But it would be answered on the merits, rather than on the firm's inability to say what happened.

## What a passing record contains

Field by field. Missing more than two of these and the record will not survive examination.

**Decision identity.** A unique immutable identifier. The decision type and the credit policy it was made under. Timestamps, with timezone, for the decision and for final approval.

**Model and configuration.** Model identifier and version as reported at call time. Prompt or configuration version. Any deterministic parameters affecting output. The code release that orchestrated the call.

**Inputs.** For each document: filename, source system, retrieval timestamp, content hash. For each structured input: field name, value, source, retrieval timestamp. Any input that was expected and unavailable, recorded as absent rather than omitted.

**Outputs and reasoning.** Raw model output, retained unedited. The structured findings extracted from it. For each factual claim: the input it traces to, the location within that input, and the verification result. Any claim that could not be traced, flagged. The generated explanation, together with the deterministic procedure that produced it.

**Human oversight.** Whether the decision was auto-cleared or routed for review, and against which threshold. Reviewer identity, committed into the audit record at approval. Reviewer action: approved, escalated, rejected or overridden. Where overridden, the reason in the reviewer's own words. The Senior Manager function under whose Statement of Responsibilities the decision sits.

**Integrity.** The hash of the preceding entry. The hash of this entry. Chain verification status at time of retrieval.

None of this is exotic. What makes it rare is that every field has to be captured at the moment of the decision. None of it can be reconstructed afterwards, which is exactly why firms discover the gap at the point they most need it closed.

## What this does not fix

Three honest limits, because a governance argument that claims too much becomes the thing it is arguing against.

This rubric measures whether a decision can be reconstructed. It does not measure whether the decision was right. A firm could score twelve out of twelve and be making consistently poor lending decisions, with excellent records of having made them. Model validation, bias testing and outcome monitoring under the Consumer Duty are separate work. The reason to start here anyway is sequencing: you cannot test outcomes you cannot reconstruct.

Nor does it authenticate anyone. A gate can record with cryptographic certainty that a named individual approved a decision and that the record was never altered, and still be relying on the calling application to have established that the person was who they said they were. That boundary has to be closed separately, and it is worth asking any vendor where theirs sits.

And it says nothing about coverage. Scoring one system well tells you about one system. The estate that gets examined is the whole of it, including the tools adopted inside teams without anybody registering them.

## The question worth asking

The Mills Review declined to write a new rulebook, and I think it was right to. What it did instead was raise the evidence bar under the rules that already exist, at the same moment that firms are handing more of the decision to the machine.

So you do not need a new framework for any of this. You need one question, put to every AI system in your firm that touches a customer outcome.

If a supervisor asked you today why this specific decision came out the way it did, what could you actually produce?

If the answer is a policy document, a register entry and a description of the approval process, you have described your framework.

If the answer is the inputs as they existed on the day, a record you can prove is unaltered, an explanation tied to those inputs and verified against them, and the name of the person who signed it, you have evidence.

Only one of those survives being asked twice.

---

*Sources: The Mills Review, FCA, 6 July 2026. Treasury Select Committee, Artificial Intelligence in Financial Services, January 2026. Senior Managers and Certification Regime, FCA Handbook SYSC 26 and the Duty of Responsibility. Consumer Duty, FCA PRIN 2A. PRA Supervisory Statement SS1/23, Model Risk Management Principles for Banks. FCA final notices in respect of Metro Bank plc, Starling Bank Limited and Monzo Bank Limited.*

*The four capabilities described here are the ones ComplyAI implements: source tracing with verbatim citation verification, a hash-chained immutable audit log, deterministic explainability records, and a Senior Manager accountability gate requiring named individual sign-off.*

*Ifat Noreen is Founder and Principal Agentic AI Architect at ShiftAi Systems Ltd, which builds governance infrastructure for AI-assisted decisions in UK regulated financial services.*
