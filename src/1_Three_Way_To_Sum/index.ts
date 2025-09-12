/**
 * Comment on the sum_to_n_a function
 * @param n - The upper limit for summation (1 + 2 + ... + n)
 * @returns The sum of integers from 1 to n
 *
 * COMPLEXITY ANALYSIS:
 * - Time Complexity: O(n) - Linear time complexity
 *   The for loop executes exactly n iterations (from i=1 to i=n),
 *   performing one addition operation per iteration. Total operations: n additions.
 *
 * - Space Complexity: O(1) - Constant space complexity
 *   Uses only two variables (count and i) regardless of input size.
 *   No additional data structures are allocated.
 */

function sum_to_n_a(n: number) {
  if (n <= 0) throw new Error("N must be greater than 0");

  let count = 0;

  for (let i = 1; i <= n; i++) {
    count += i;
  }
  return count;
}

/**
 * Comment on the sum_to_n_b function
 * @param n - The upper limit for summation (n + (n-1) + ... + 1)
 * @returns The sum of integers from 1 to n
 *
 * COMPLEXITY ANALYSIS:
 * - Time Complexity: O(n) - Linear time complexity
 *   The while loop executes exactly n iterations (n, n-1, n-2, ..., 1, 0),
 *   performing one addition and one subtraction operation per iteration.
 *   Total operations: n additions + n subtractions = 2n operations.
 *
 * - Space Complexity: O(1) - Constant space complexity
 *   Uses only two variables (count and n parameter which gets modified).
 *   No additional memory allocation regardless of input size.
 **/

function sum_to_n_b(n: number) {
  if (n <= 0) throw new Error("N must be greater than 0");
  let i = n;
  let count = 0;

  while (i > 0) {
    count += i;
    i -= 1;
  }
  return count;
}

/**
 * Comment on the sum_to_n_c function
 * @param n - The upper limit for summation (1 + 2 + ... + n)
 * @returns The sum of integers from 1 to n using closed-form formula
 * @throws Error if n is less than or equal to 0
 *
 * COMPLEXITY ANALYSIS:
 * - Time Complexity: O(1) - Constant time complexity
 *   Uses the closed-form arithmetic series formula: n*(n+1)/2
 *   Performs exactly 3 primitive operations regardless of input size:
 *   1. Multiplication (n * (n + 1))
 *   2. Addition ((n + 1))
 *   3. Division (result / 2)
 *
 * - Space Complexity: O(1) - Constant space complexity
 *   Uses no additional memory allocation, only temporary variables for calculation
 **/

function sum_to_n_c(n: number) {
  if (n <= 0) throw new Error("N must be greater than 0");
  return (n * (n + 1)) / 2;
}

[sum_to_n_a, sum_to_n_b, sum_to_n_c].forEach((func) => console.log(func(5)));
