/* Learning content based on the supplied Algorithm Fieldbook material. */
window.FIELD_CONTENT = {
  "algorithms": {
    "Finding Maximum": {
      "category": "Brute force / basic procedure",
      "section": "§3.1",
      "task": "Find the largest value in a nonempty list.",
      "purpose": "Find the maximum without first sorting the list.",
      "idea": "Keep the largest value seen so far. For every later number, replace it only if that number is larger.",
      "steps": [
        "Take the first value as the current maximum.",
        "Compare the next value with the current maximum.",
        "Update it if needed, then continue.",
        "Return the maximum after examining every value."
      ],
      "pseudo": "MAXIMUM(A[1..n])  // n ≥ 1\n    largest ← A[1]\n    FOR i ← 2 TO n\n        IF A[i] > largest\n            largest ← A[i]\n    RETURN largest",
      "code": "def find_maximum(numbers):\n    if not numbers:\n        raise ValueError('At least one number is needed')\n    largest = numbers[0]\n    for i in range(1, len(numbers)):\n        if numbers[i] > largest:\n            largest = numbers[i]\n    return largest\n\nprint(find_maximum([8, 4, 11, 3, 10]))  # 11",
      "sample": "[8, 4, 11, 3, 10]",
      "output": "11",
      "best": "Θ(n)",
      "average": "Θ(n)",
      "worst": "Θ(n)",
      "space": "Θ(1) auxiliary (index-loop version)",
      "count": "Exactly n − 1 element comparisons on a nonempty list.",
      "advantages": "Simple; works on unsorted input; uses constant additional memory.",
      "limitations": "Every element after the first must be checked.",
      "application": "Finding the highest examination mark in a class."
    },
    "Linear Search": {
      "category": "Searching",
      "section": "§3.1.2; §3.3",
      "task": "Find a target in a list, or report that it is absent.",
      "purpose": "Search without requiring sorted order.",
      "idea": "Inspect entries one at a time, from left to right. Stop at the first match.",
      "steps": [
        "Start with the first entry.",
        "Compare it to the target.",
        "Return its index if equal; otherwise move right.",
        "If no entry matches, return −1 in Python."
      ],
      "pseudo": "LINEAR_SEARCH(A[1..n], x)\n    FOR i ← 1 TO n\n        IF A[i] = x\n            RETURN i\n    RETURN 0  // Rosen's not-found marker",
      "code": "def linear_search(numbers, target):\n    for i in range(len(numbers)):\n        if numbers[i] == target:\n            return i\n    return -1\n\nprint(linear_search([5, 8, 12, 16, 20], 16))  # 3",
      "sample": "[5, 8, 12, 16, 20], target 16",
      "output": "Python index 3",
      "best": "Θ(1)",
      "average": "Θ(n), present target uniformly distributed",
      "worst": "Θ(n)",
      "space": "Θ(1) auxiliary",
      "count": "Target at 1-based position i: i equalities; absent target: n. Equal-probability present target: (n + 1)/2 on average.",
      "advantages": "Easy to write; works on any order and stops early when possible.",
      "limitations": "May inspect every element in a large list.",
      "application": "Checking whether a name occurs in a small unindexed list."
    },
    "Binary Search": {
      "category": "Searching",
      "section": "§3.1.2; §3.3",
      "task": "Locate a target in an increasing list of distinct items.",
      "purpose": "Avoid checking most elements by repeatedly narrowing the search interval.",
      "idea": "Compare the target with the middle item, then keep only the half where the target could still be.",
      "steps": [
        "Begin with low = 0 and high = n − 1.",
        "Choose the middle index.",
        "If the target is greater than the middle value, keep the right half; otherwise keep the left half.",
        "When one index remains, compare it with the target."
      ],
      "pseudo": "BINARY_SEARCH(A[1..n] increasing, x)\n    left ← 1; right ← n\n    WHILE left < right\n        mid ← floor((left + right)/2)\n        IF x > A[mid]\n            left ← mid + 1\n        ELSE\n            right ← mid\n    IF A[left] = x\n        RETURN left\n    RETURN 0",
      "code": "def binary_search(numbers, target):\n    if not numbers:\n        return -1\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if target > numbers[mid]:\n            left = mid + 1\n        else:\n            right = mid\n    return left if numbers[left] == target else -1\n\nprint(binary_search([1, 3, 6, 8, 12, 19], 19))  # 5",
      "sample": "[1, 3, 6, 8, 12, 19], target 19",
      "output": "Python index 5",
      "best": "Θ(log n), for this narrow-to-one version, n ≥ 2",
      "average": "O(log n) upper bound",
      "worst": "Θ(log n)",
      "space": "Θ(1) auxiliary, iterative",
      "count": "The interval shrinks by roughly half each round. At most ⌈log₂ n⌉ narrowing comparisons and one final equality check in this variant.",
      "advantages": "Scales well on large sorted data.",
      "limitations": "Requires sorted input. Sorting first has a cost; this version assumes distinct values for a clear demonstration.",
      "application": "Looking up a value in an ordered index."
    },
    "Bubble Sort": {
      "category": "Sorting; direct / brute-force approach",
      "section": "§3.1.3; §3.3",
      "task": "Rearrange a list in increasing order.",
      "purpose": "Learn sorting through adjacent comparisons and exchanges.",
      "idea": "Compare adjacent elements and swap them when they are out of order. Each full pass fixes the largest remaining element at the right.",
      "steps": [
        "Compare the first adjacent pair.",
        "Swap if the left value is greater.",
        "Repeat across the unsorted portion.",
        "Make n − 1 passes, shortening the comparison range each time."
      ],
      "pseudo": "BUBBLE_SORT(A[1..n])\n    FOR pass ← 1 TO n − 1\n        FOR j ← 1 TO n − pass\n            IF A[j] > A[j + 1]\n                SWAP A[j], A[j + 1]\n    RETURN A",
      "code": "def bubble_sort(numbers):\n    n = len(numbers)\n    for passed in range(n - 1):\n        for j in range(n - passed - 1):\n            if numbers[j] > numbers[j + 1]:\n                numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]\n    return numbers\n\nprint(bubble_sort([3, 2, 4, 1, 5]))  # [1, 2, 3, 4, 5]",
      "sample": "[3, 2, 4, 1, 5]",
      "output": "[1, 2, 3, 4, 5]",
      "best": "Θ(n²), fixed passes",
      "average": "Θ(n²), fixed passes",
      "worst": "Θ(n²)",
      "space": "Θ(1) auxiliary, in place",
      "count": "(n − 1) + (n − 2) + ··· + 1 = n(n − 1)/2 adjacent comparisons, regardless of data order.",
      "advantages": "Very easy to trace; sorts in place.",
      "limitations": "Quadratic comparison count even when the list is already sorted in this version.",
      "application": "Showing how repeated local swaps create a sorted order."
    },
    "Insertion Sort": {
      "category": "Sorting; direct / brute-force approach",
      "section": "§3.1.3; §3.3",
      "task": "Rearrange a list in increasing order.",
      "purpose": "Build a sorted prefix one item at a time.",
      "idea": "Hold the next value as a key, move larger earlier values one place right, and insert the key into the gap.",
      "steps": [
        "Treat the first element as sorted.",
        "Take the next element as the key.",
        "Compare backward through the sorted prefix and shift larger values.",
        "Place the key into the available position and repeat."
      ],
      "pseudo": "INSERTION_SORT(A[1..n])\n    FOR j ← 2 TO n\n        key ← A[j]\n        i ← j − 1\n        WHILE i ≥ 1 AND A[i] > key\n            A[i + 1] ← A[i]\n            i ← i − 1\n        A[i + 1] ← key\n    RETURN A",
      "code": "def insertion_sort(numbers):\n    for j in range(1, len(numbers)):\n        key = numbers[j]\n        i = j - 1\n        while i >= 0 and numbers[i] > key:\n            numbers[i + 1] = numbers[i]\n            i -= 1\n        numbers[i + 1] = key\n    return numbers\n\nprint(insertion_sort([3, 2, 4, 1, 5]))  # [1, 2, 3, 4, 5]",
      "sample": "[3, 2, 4, 1, 5]",
      "output": "[1, 2, 3, 4, 5]",
      "best": "Θ(n), backward-shift implementation",
      "average": "Θ(n²), random permutation assumption",
      "worst": "Θ(n²)",
      "space": "Θ(1) auxiliary, in place",
      "count": "On reversed input, the j-th insertion compares/shifts up to j − 1 earlier values; summing gives n(n − 1)/2. This backward-scan variant is not Rosen's exact forward-scan code.",
      "advantages": "In place; efficient on already sorted or nearly sorted small inputs.",
      "limitations": "Many shifts are required on reversed input.",
      "application": "Putting a new card into the correct location in an ordered hand."
    },
    "Naive String Matcher": {
      "category": "String matching; brute force",
      "section": "§3.1.4",
      "task": "Find every occurrence of a pattern within a larger text.",
      "purpose": "Locate matching text without building an extra index.",
      "idea": "Align the pattern with each possible starting position and compare letters until the first mismatch or a full match.",
      "steps": [
        "Align the pattern at text position 0.",
        "Compare aligned characters left to right.",
        "Record the shift if all pattern characters match.",
        "Move to the next shift and repeat."
      ],
      "pseudo": "NAIVE_MATCH(T, P)  // 1 ≤ m ≤ n\n    FOR shift ← 0 TO n − m\n        j ← 1\n        WHILE j ≤ m AND T[shift+j] = P[j]\n            j ← j + 1\n        IF j > m\n            REPORT shift",
      "code": "def naive_match(text, pattern):\n    if not pattern:\n        raise ValueError('Use a nonempty pattern')\n    positions = []\n    for shift in range(len(text) - len(pattern) + 1):\n        j = 0\n        while j < len(pattern) and text[shift + j] == pattern[j]:\n            j += 1\n        if j == len(pattern):\n            positions.append(shift)\n    return positions\n\nprint(naive_match('eceyeye', 'eye'))  # [2, 4]",
      "sample": "text = 'eceyeye', pattern = 'eye'",
      "output": "Match shifts [2, 4]",
      "best": "O(n) upper bound for fixed pattern size",
      "average": "Depends on text/pattern assumptions",
      "worst": "O((n − m + 1)m)",
      "space": "O(1) search logic; O(k) returned matches",
      "count": "There are n − m + 1 shifts when m ≤ n; each needs at most m character comparisons.",
      "advantages": "Easy to implement; detects overlapping matches.",
      "limitations": "May compare many characters repeatedly, especially in repetitive text.",
      "application": "Finding a short word inside a sentence."
    },
    "Cashier's Algorithm": {
      "category": "Greedy approach",
      "section": "§3.1.5",
      "task": "Make an amount using available coin values.",
      "purpose": "Practice a locally best-looking choice at each step.",
      "idea": "Repeatedly take the largest denomination that fits the remaining amount.",
      "steps": [
        "Order positive denominations from largest to smallest.",
        "Select the largest coin that fits.",
        "Subtract it and repeat for the current denomination.",
        "Move to smaller values until the amount is zero or no coin fits."
      ],
      "pseudo": "CASHIER(amount, coins descending)\n    FOR each coin c\n        count[c] ← 0\n        WHILE amount ≥ c\n            count[c] ← count[c] + 1\n            amount ← amount − c\n    RETURN count",
      "code": "def cashier(amount, coins):\n    selected = []\n    for coin in sorted(coins, reverse=True):\n        while amount >= coin:\n            amount -= coin\n            selected.append(coin)\n    return selected, amount\n\nprint(cashier(67, [25, 10, 5, 1]))  # ([25, 25, 10, 5, 1, 1], 0)",
      "sample": "amount 67; coins [25, 10, 5, 1]",
      "output": "25 + 25 + 10 + 5 + 1 + 1",
      "best": "Depends on values and amount",
      "average": "Not specified",
      "worst": "O(r + q) for repeated subtraction",
      "space": "O(q) to list q coins; O(r) if storing counts by denomination",
      "count": "For r denominations and q coins chosen, repeated subtraction performs O(r + q) amount-versus-coin checks.",
      "advantages": "Straightforward and often quick; optimal for familiar US denominations as shown by Rosen.",
      "limitations": "Not optimal for every coin system: for [25, 10, 1] and amount 30, greedy uses six coins instead of three tens.",
      "application": "Giving change with a fixed set of denominations."
    },
    "Scheduling Talks": {
      "category": "Greedy approach",
      "section": "§3.1.5",
      "task": "Select as many non-overlapping talks as possible in one room.",
      "purpose": "Practice an exchange-based justification of a greedy rule.",
      "idea": "Sort talks by finishing time, then take each talk that starts no earlier than the last accepted finish.",
      "steps": [
        "Order all talks by earliest finishing time.",
        "Accept the first valid talk.",
        "Accept a later talk only if its start is at or after the last accepted end.",
        "Return all chosen talk names."
      ],
      "pseudo": "SCHEDULE(talks)\n    SORT talks by ending time\n    chosen ← empty\n    previous_end ← −infinity\n    FOR each talk\n        IF talk.start ≥ previous_end\n            append talk to chosen\n            previous_end ← talk.end\n    RETURN chosen",
      "code": "def schedule_talks(talks):\n    ordered = sorted(talks, key=lambda t: (t[2], t[1]))\n    chosen = []\n    previous_end = float('-inf')\n    for name, start, end in ordered:\n        if start >= previous_end:\n            chosen.append(name)\n            previous_end = end\n    return chosen\n\ntalks = [('A',8,12),('B',9,10),('C',11,12),('D',12,13),('E',10,11)]\nprint(schedule_talks(talks))  # ['B', 'E', 'C', 'D']",
      "sample": "A 8–12, B 9–10, C 11–12, D 12–13, E 10–11",
      "output": "B, E, C, D",
      "best": "O(n log n), including sorting",
      "average": "Not specified",
      "worst": "O(n log n), including sorting",
      "space": "O(n) with sorted copy and chosen list",
      "count": "Sorting costs O(n log n) using Python's sort; the selection scan performs exactly n compatibility checks.",
      "advantages": "The earliest-finish rule produces a maximum-size compatible selection.",
      "limitations": "Does not optimize unrelated goals such as highest total priority or shortest waiting time.",
      "application": "Planning lectures or presentations in a single venue."
    },
    "Closest Pair (Brute Force)": {
      "category": "Brute-force approach",
      "section": "§3.3.4",
      "task": "Find the closest two points among at least two planar points.",
      "purpose": "Demonstrate exhaustive pair checking.",
      "idea": "Compute squared distance for each pair of distinct input positions, keeping the smallest result.",
      "steps": [
        "Initialize best distance to infinity.",
        "Generate each unordered pair once.",
        "Compute the squared distance and update the best pair if smaller.",
        "Return the best pair after testing every pair."
      ],
      "pseudo": "CLOSEST_PAIR(P[1..n])  // n ≥ 2\n    best ← infinity\n    FOR i ← 1 TO n − 1\n        FOR j ← i + 1 TO n\n            d ← (xi − xj)² + (yi − yj)²\n            IF d < best\n                best ← d; pair ← (i, j)\n    RETURN pair, best",
      "code": "def closest_pair(points):\n    best = float('inf')\n    pair = None\n    for i in range(len(points) - 1):\n        for j in range(i + 1, len(points)):\n            dx = points[i][0] - points[j][0]\n            dy = points[i][1] - points[j][1]\n            d = dx*dx + dy*dy\n            if d < best:\n                best, pair = d, (points[i], points[j])\n    return pair, best\n\nprint(closest_pair([(0,0),(4,4),(1,1),(8,6)]))",
      "sample": "[(0,0), (4,4), (1,1), (8,6)]",
      "output": "((0,0),(1,1)), squared distance 2",
      "best": "Θ(n²)",
      "average": "Θ(n²)",
      "worst": "Θ(n²)",
      "space": "Θ(1) auxiliary",
      "count": "Every pair is checked: (n − 1) + (n − 2) + ··· + 1 = n(n − 1)/2.",
      "advantages": "Simple to verify; no sorting or geometry structure needed.",
      "limitations": "Quadratic number of pair tests on large datasets.",
      "application": "Finding the two closest landmarks in a small group of coordinates."
    }
  },
  "properties": [
    [
      "Input",
      "Accept values from a defined domain.",
      "A nonempty list of marks."
    ],
    [
      "Output",
      "Produce a well-defined answer.",
      "The largest mark in that list."
    ],
    [
      "Definiteness",
      "Every instruction has a precise meaning.",
      "Compare the next mark with the largest so far."
    ],
    [
      "Correctness",
      "Return the required answer for every allowed input.",
      "The result must be at least every entry."
    ],
    [
      "Finiteness",
      "Finish after finitely many steps.",
      "Only finitely many entries are examined."
    ],
    [
      "Effectiveness",
      "Each basic step can be carried out exactly in finite time.",
      "An assignment or numerical comparison."
    ],
    [
      "Generality",
      "Work for every instance of the same problem type.",
      "Not only for the sample list [8, 4, 11, 3, 10]."
    ]
  ],
  "quiz": [
    [
      "Which property says each instruction must be unambiguous?",
      [
        "Correctness",
        "Definiteness",
        "Generality",
        "Finiteness"
      ],
      1,
      "Definiteness means the steps are described precisely."
    ],
    [
      "What is the output of maximum-finding for [8, 4, 11, 3, 10]?",
      [
        "8",
        "10",
        "11",
        "4"
      ],
      2,
      "The maximum is updated when the value 11 is examined."
    ],
    [
      "Which search can work on an unsorted list?",
      [
        "Binary search only",
        "Linear search",
        "Neither search",
        "Both require sorting"
      ],
      1,
      "Linear search examines values sequentially without an order requirement."
    ],
    [
      "What must be true before applying the binary search in this fieldbook?",
      [
        "Values must be negative",
        "There must be a million values",
        "The list must be sorted",
        "The list must be reversed"
      ],
      2,
      "Binary search discards half based on ordered values."
    ],
    [
      "Why is binary search logarithmic?",
      [
        "It sorts the array",
        "It roughly halves the candidates each round",
        "It checks every item",
        "It uses two loops"
      ],
      1,
      "About log₂(n) halvings reduce an interval to one candidate."
    ],
    [
      "Fixed-pass bubble sort makes how many adjacent comparisons?",
      [
        "n",
        "log₂ n",
        "n(n − 1)/2",
        "2ⁿ"
      ],
      2,
      "The pass lengths are n−1, n−2, ..., 1; their sum is n(n−1)/2."
    ],
    [
      "What does insertion sort maintain during its run?",
      [
        "A sorted left prefix",
        "A binary tree",
        "A sorted right prefix only",
        "A hash table"
      ],
      0,
      "Each key is inserted into the already sorted earlier section."
    ],
    [
      "The naive string matcher finds a pattern by...",
      [
        "Using a priority queue",
        "Trying candidate shifts and comparing characters",
        "Sorting all characters first",
        "Only checking the first letter"
      ],
      1,
      "It aligns the pattern at successive possible start positions."
    ],
    [
      "Which statement about greedy change-making is correct?",
      [
        "Greedy is optimal for every coin system",
        "Greedy always fails",
        "The largest-fitting-coin rule may not minimize coins",
        "Greedy needs dynamic programming"
      ],
      2,
      "With denominations [25,10,1] and amount 30, greedy uses six coins, but three tens suffice."
    ],
    [
      "To schedule the maximum number of compatible talks, choose by...",
      [
        "Earliest finish time",
        "Latest finish time",
        "Longest duration",
        "Alphabetical name"
      ],
      0,
      "The earliest-finishing available talk leaves at least as much room for later talks."
    ],
    [
      "In f(n) = O(g(n)), the symbol O gives an eventual...",
      [
        "Exact runtime",
        "Upper bound up to a constant factor",
        "Lower bound only",
        "Memory address"
      ],
      1,
      "Big-O bounds f from above for sufficiently large n."
    ],
    [
      "Which notation gives an asymptotic lower bound?",
      [
        "Big-O",
        "Big-Omega",
        "Big-Theta only",
        "None"
      ],
      1,
      "Ω(g) requires f(n) ≥ c·g(n) eventually."
    ],
    [
      "If f(n) is both O(n²) and Ω(n²), then f(n) is...",
      [
        "Θ(n²)",
        "Θ(n)",
        "Always constant",
        "Undefined"
      ],
      0,
      "Matching upper and lower bounds establish Big-Theta."
    ],
    [
      "Auxiliary space excludes...",
      [
        "Loop variables",
        "Working memory",
        "The given input storage",
        "Temporary arrays"
      ],
      2,
      "Auxiliary space counts additional storage, excluding the input itself."
    ],
    [
      "What does worst-case time complexity describe?",
      [
        "The smallest work on inputs of size n",
        "The maximum work on allowed inputs of size n",
        "An average measured in seconds",
        "Only memory cost"
      ],
      1,
      "Worst-case analysis considers the maximum operation count for a fixed input size."
    ]
  ]
};
