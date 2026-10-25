# Data Issues Log — Shaheen Express (Live Site Audit)

This document records all anomalies, typos, formatting quirks, and inconsistencies identified on the live website [shaheenexpress.com.pk](https://shaheenexpress.com.pk/) (fetched October 2026). Per instructions, all values and text strings in the new application are preserved **exactly verbatim as published**, without unauthorized alterations.

---

## 1. Route Schedule Table (`#time`)

| Row / Route | Live Field Value | Issue Identified | New Site Handling |
| :--- | :--- | :--- | :--- |
| **Lahore to Kohat** | `033594944818/03319249571` | **12-digit typo**: `033594944818` contains an erroneous duplicate '4' (12 digits instead of standard 11). Furthermore, two phone numbers are merged in a single string separated by a forward slash. | Maintained verbatim text string for display; dial links support both numbers cleanly. |
| **Lahore to Bannu** | `03359494818` | In this row, the number is written with 11 digits, confirming the duplicate '4' in the row above was an accidental typographical error on WordPress TablePress. | Maintained verbatim as `03359494818`. |
| **Hangu to Lahore, Bannu to Lahore, Lahore to Bannu** | `---` (2nd Time column) | Hyphen string indicating no secondary departure time scheduled. | Maintained verbatim. |
| **Schedule Directionality** | Outbound vs Return | Karachi has 2 rows (`Karachi to Peshawar/Kohat` and `Kohat/Peshawar to Karachi`), while Kohat to Lahore has return `Lahore to Kohat`, but Hangu and Bannu only have one-way trips to Lahore. | Maintained verbatim with exactly 7 rows. |

---

## 2. Terminals Table ("Kohat to Pindi / Abbottabad / Gujranwala")

| Row / Route | Live Field Value | Issue Identified | New Site Handling |
| :--- | :--- | :--- | :--- |
| **Kohat to Gujranwala (Gujranwala Star Travel)** | `0337-96541104` | **12-digit mobile number**: Contains 8 digits after the prefix (`0337-96541104`) instead of standard 7 digits. | Maintained verbatim display string `0337-96541104`. |
| **Kohat to Pindi (Skyways Terminal Faizabad)** | `0333-9633251 / 051-111-555-567` | Combined mobile number and landline UAN separated by space and slash. | Maintained verbatim display text while providing clickable tel links for both numbers. |
| **Kohat to Abbottabad (Abbottabad Sardar Travel)** | `0992-335238` | Local Abbottabad landline (6 digits after area code). | Maintained verbatim. |
| **Kohat to Pindi / Abbottabad / Gujranwala (Kohat Terminals)** | `ShaJee Terminal Kohat` vs `Kohat` | In row 1 it is named "ShaJee Terminal Kohat", while in rows 4 and 6 it is simply listed as "Kohat". | Maintained verbatim. |

---

## 3. General Site Typography & Contacts

| Section | Live Value | Issue Identified | New Site Handling |
| :--- | :--- | :--- | :--- |
| **Header Action Button** | `href="tel:923331583335"` | Links to country code format without leading `+`. | Standardized tel link to `tel:923331583335`. |
| **Footer Contact Phone** | `0333-1583335` | Hyphenated local format. | Preserved verbatim in footer and contact sections. |
| **Footer Address** | `Khyber Coach Stand opp. FG Public School, Kohat,\u00a0Cantt.` | Contains a non-breaking space `\u00a0` entity after the comma before Cantt. | Displayed cleanly with standard typography. |
| **Visionary Leaders Heading** | `" Visionary Leaders"` | Heading contains a leading whitespace character in the live Elementor markup. | Handled gracefully. |
