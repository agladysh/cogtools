module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // We are striving for a reasonable set of rules that are making LLM generation more friendly.
    // Disabling 'subject-case' to allow more flexibility in commit message subjects.
    'subject-case': [0, 'always', []],
    'body-max-line-length': [0, 'always', []],
  },
};
