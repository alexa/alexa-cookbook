<!---
When submitting a PR, be sure to complete the appropriate section
Also, consider opening an issue to discuss the contribution
Additionally, switch to the "preview" view to be able to click the links.

sections:
- issue related (including patch/bug fix)
- feature demo
- resource
- guide
- module
- tools
- general code checklist (applies to any submission including code)
You can remove any sections not applicable.
--->

<!--- *** Issue section *** --->
### Issue/Patch/Bug Fix
*Issue #, if available:*

*Description of changes:*

<!--- *** Feature Demo section *** --->
### New Feature Demo
*Issue #, if one was opened:*

*Feature being demonstrated:*

#### Checklist for Feature Demo
- [ ] Used [feature demo template](../tree/master/resources/cookbook-templates/feature-demo-template) as base.
- [ ] Checked that an existing feature demo does not already exist
- [ ] .ask/config file (normally unmodified [template](../blob/master/resources/cookbook-templates/feature-demo-template/.ask/config))
- [ ] skill.json
  - [ ] Includes en-US section
  - [ ] Includes Lambda endpoint section including uri
  - [ ] Does not include Privacy and Compliance section or other publishing attributes
- [ ] Readme.md with description and instructions based on this [template](../blob/master/resources/cookbook-templates/feature-demo-template/README.md)
- [ ] en-US.json language model (other locales optional)
  - [ ] invocation name includes the word 'demo' (for en-US. Use equivalent for other languages/locales.)
- [ ] skill code written in node.js, python or java (node.js and python preferred since java requires additional setup)
- [ ] Does not include excess functionality not required to demonstrate the feature
- [ ] Passes all skill certification criteria (https://developer.amazon.com/docs/custom-skills/certification-requirements-for-custom-skills.html) 
- [ ] General checklist (at end of PR template) has been covered

<!--- *** Resource section *** --->
### New Resource
*Issue #, if one was opened:*

*Name of new resource:*
*Type of resource:*
- [ ] Intent
- [ ] Slot
- [ ] APL package
- [ ] Other (Note: It is recommended to open an issue first, to ensure the type can be accepted and to determine requirements)
    Please specify:

*Description of Resource:*

#### Checklist for Intent Resource type
- [ ] Checked that it does not duplicate an existing [built-in intent](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html) or one already in the Cookbook
- [ ] en-US.json formatted language model (other locales optional)
- [ ] en-US.txt formatted language model (other locales optional)
- [ ] Intent name is prefixed with `COOKBOOK_`
- [ ] Includes 20+ (quality) sample utterances
- [ ] reference/link to typical slot types used with intent (if any)
    - [ ] Includes 5+ prompts and 5+ sample utterances for slot elicitation. (Prompts and sample utterances should include references to associated slots.)
    - [ ] Includes 5+ slot validation prompts (including references to associated slot values)
- [ ] Includes a description/link in the applicable resource category README. (If you are not sure what category to use, open an issue to ask.)

#### Checklist for Slot Resource type
- [ ] Checked that it does not duplicate an existing [built-in slot type](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html) or one already in the Cookbook
- [ ] en-US.json formatted language model (other locales optional)
- [ ] en-US.txt formatted language model (other locales optional)
- [ ] Slot Type Name is prefixed with `COOKBOOK_`
- [ ] Includes id's
- [ ] Includes synonyms
- [ ] Includes a description/link in the applicable resource category README. (If you are not sure what category to use, open an issue to ask.)

#### Checklist for APL Package type
- [ ] Checked that it does not duplicate an existing [APL Package](https://developer.amazon.com/docs/alexa-presentation-language/apl-alexa-packages-overview.html) or one already in the Cookbook
- [ ] Does not utilize practices which would prevent certification
- [ ] The document.description property has been specified, it starts with `COOKBOOK: ` and includes the purpose of the package and a link to the location in the cookbook.
- [ ] Avoidance of %-based dimensions
- [ ] Works on these viewports:
  - [ ] Small Round Hub
  - [ ] Small Landscape Hub
  - [ ] Medium Landscape Hub
  - [ ] Large Landscape Hub
  - [ ] X-Large Landscape TV
- [ ] Documentation adhering to this [style guide](../blob/master/guides/style/markdown-style-guide-for-alexa-cookbook.md), plus
  - [ ] Description of the functionality provided by the package
  - [ ] How to use the package
  - [ ] Describes any parameters
  - [ ] Previews (as png or pdf) of what the package provides
- [ ] Includes any support skill code (for handling events, etc.)

<!--- *** Guide section *** --->
### New Guide
*Issue #, if one was opened:*

*Guide Description:*

#### Checklist for Guide
- [ ] Checked that it does not duplicate an existing guide or the ASK product documentation
- [ ] Focuses on the steps to accomplish a task
- [ ] Does not utilize practices which would prevent certification
- [ ] Addresses all supported locales (excluding translations)
- [ ] Includes a description/link in the applicable guide directory README file.

<!--- *** Module section *** --->
### New Module
*Issue #, if one was opened:*

*Guide Description:*

#### Checklist for Module
- [ ] Checked that it does not duplicate an existing module
- [ ] Does not utilize practices which would prevent certification
- [ ] Includes documentation adhering to this [style guide](../blob/master/guides/style/markdown-style-guide-for-alexa-cookbook.md)
    - [ ] prerequisites / dependencies
    - [ ] setup instructions
    - [ ] usage instructions
    - [ ] examples
- [ ] Includes a description/link in the applicable module directory README file.
- [ ] General checklist (at end of PR template) has been covered

<!--- *** Tools section *** --->
### New Tool
*Issue #, if one was opened:*

*tool Description:*

#### Checklist for Tool
- [ ] Checked that it does not duplicate an existing tool referenced in the Cookbook
- [ ] Does not enable practices which would prevent certification
- [ ] Includes documentation adhering to this [style guide](../blob/master/guides/style/markdown-style-guide-for-alexa-cookbook.md)
    - [ ] setup instructions
    - [ ] usage instructions
    - [ ] examples
- [ ] sample templates that can be used by the tool
- [ ] PDF versions of templates or samples produced by the tool
- [ ] Addresses all supported locales (excluding translations)
- [ ] Includes a description & link in the applicable tool directory README file.

<!-- general checklist  -->
### Tests/checks which any code/configuration submission will need to pass
- [ ] Adheres to any applicable [code style guidelines](../tree/master/guides/style) including linting
- [ ] Code is i18n-ready (does not need to be translated/localized)
- [ ] Does not utilize practices which would prevent certification
- [ ] `ask deploy` successfully deploys skill and is ready for use
  > setup steps which are not achievable through the ASK CLI are exempted from this requirement
  > If multiple runtime languages are included, skill.json should use node.js or python version. 
- [ ] Works in all locales for which interaction models have been supplied
- [ ] Works on all devices (including simulator) which support any required features (special requirements must be called out in the README)
- [ ] Documents any dependencies in the README
- [ ] PR does not include any code dependencies (just includes the package.json, pom.xml, etc.)

<!--- * * * * * * * * * * * * --->
<!--- Do not delete the following section or your PR will be closed without comment. --->

By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of your choice.
