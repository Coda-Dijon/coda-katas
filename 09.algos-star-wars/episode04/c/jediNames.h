#ifndef JEDI_NAMES_H
#define JEDI_NAMES_H

/**
 * Writes the unique names (first-occurrence order) into `out`.
 * `out` must be able to hold up to `count` entries.
 * Returns the number of unique names written.
 */
int unique_jedi_names(const char **names, int count, const char **out);

#endif
