/* Learning studio: predictions derive from the same operation traces as the visualizer. */
(function () {
  'use strict';
  const E = window.FBEngine;
  function trace(name, fields) {
    return E.build(name, fields || E.DEFAULTS[name]);
  }
  function findStep(steps, term) {
    const i = steps.findIndex(s => s.note.includes(term));
    if (i < 1) throw new Error('Learning scenario could not find step: ' + term);
    return [steps[i - 1], steps[i]];
  }
  function problem(id, algorithm, title, question, choices, answer, hint, why, mistake, before, after, focus) {
    if (!choices.includes(String(answer))) throw new Error('A predicted answer was not in the choices for ' + id);
    return {id, algorithm, title, question, choices, answer:String(answer), hint, why, mistake, before, after, focus:focus||[]};
  }
  function puzzles() {
    const p=[];
    let s = trace('Finding Maximum');
    p.push(problem('max','Finding Maximum','Remember the largest','The current maximum is 8. The next number is 11. What is the new maximum?',
      ['8','11','4','10'],s[2].maximum,'Compare the new number with the maximum you have kept so far.',
      'The maximum after reading a prefix of the list must equal the largest value in that prefix. Since 11 > 8, replace 8 with 11.',
      'You do not have to sort the whole list or start again.',s[1],s[2],[2]));
    s = trace('Linear Search');
    p.push(problem('linear','Linear Search','Search one by one','The first two values (5 and 8) did not match 16. Which index is checked next?',
      ['Index 0','Index 1','Index 2','Index 4'],'Index '+s[3].active[0],
      'Linear search always continues from left to right, one position at a time.',
      'After testing indices 0 and 1, the next index is 2, containing 12. It only stops on a match or after the last element.',
      'Skipping an unchecked element could miss the target.',s[2],s[3],[2]));
    s = trace('Binary Search');
    p.push(problem('binary','Binary Search','Keep the possible half','You search for 19 in this sorted list. The first middle value is 10. Which 0-based index interval remains?',
      ['0–7','8–15','0–15','7–15'],s[1].low+'–'+s[1].high,
      'The list is ordered. If 19 > 10, can a smaller item contain 19?',
      'Because 19 is greater than the middle value 10, all positions up to and including that middle can be discarded. Keep indices 8–15.',
      'Keeping the middle position does not follow this implementation: its value is already too small.',s[0],s[1],[7,8]));
    s = trace('Bubble Sort');
    p.push(problem('bubble','Bubble Sort','Decide whether to swap','Bubble sort starts with [3, 2, 4, 1, 5]. What is the array immediately after comparing 3 and 2?',
      ['[3, 2, 4, 1, 5]','[2, 3, 4, 1, 5]','[1, 2, 3, 4, 5]','[3, 4, 2, 1, 5]'],
      '['+s[2].array.join(', ')+']','An adjacent pair is swapped when the left number is larger than the right one.',
      'The first pair is out of order (3 > 2), so only those two adjacent values are exchanged. One comparison does not sort the entire list.',
      'Bubble sort does not jump directly to a fully sorted array.',s[1],s[2],[0,1]));
    s = trace('Insertion Sort');
    {let [b,a] = findStep(s,'Insert key 2');
      p.push(problem('insert','Insertion Sort','Build a sorted prefix','You have a sorted prefix [3] and the next key is 2. What are the first two values after inserting it?',
        ['[3, 2]','[2, 3]','[2, 2]','[3, 3]'], '['+a.array.slice(0,2).join(', ')+']',
        'The key must be inserted before any larger value in the sorted portion.',
        'Move 3 one place to the right and place key 2 at the start. The sorted prefix becomes [2, 3].',
        'A shifted duplicate is temporary; you still have to insert the key.',b,a,[0,1]));}
    s = trace('Naive String Matcher');
    {let [b,a] = findStep(s,'Full pattern found at index 2');
      p.push(problem('match','Naive String Matcher','Check every alignment','In text “eceyeye”, at which 0-based position does “eye” first match completely?',
        ['0','1','2','3'],a.matches[0],
        'At each starting position, compare characters until you find a mismatch or finish the pattern.',
        'At index 2 the text contains e-y-e in order. Starting at index 0 fails on the second character.',
        'The start position is counted from 0 here, not 1.',b,a,[2,3,4]));}
    s = trace("Cashier's Algorithm");
    p.push(problem('coins',"Cashier's Algorithm",'Pick the largest fitting coin','You need 67 units of change and have 25, 10, 5 and 1 unit coins. What is the first coin and the new remainder?',
      ['25 → 42','10 → 57','25 → 17','5 → 62'],s[1].coin+' → '+s[1].remaining,
      'Greedy change tries the largest coin that does not exceed what remains.',
      'The largest allowed coin is 25, so 67 − 25 = 42 remains. This greedy rule is not optimal for every possible coin system.',
      'The goal is not to choose the smallest coin first.',s[0],s[1]));
    s = trace('Scheduling Talks');
    p.push(problem('talks','Scheduling Talks','Choose the next compatible talk','The talk B (9–10) has been chosen. Which compatible talk is selected next under the earliest-finish rule?',
      ['A (8–12)','C (11–12)','E (10–11)','D (12–13)'],s[2].chosen[1].name+' (10–11)',
      'Among talks that can start at time 10, choose the one that ends earliest.',
      'E starts at 10, just as B finishes, and ends at 11. Choosing A would overlap B.',
      'The greedy rule uses finishing times, not simply the alphabetical order of talk names.',s[1],s[2]));
    s = trace('Closest Pair (Brute Force)');
    {const i=s.findIndex(t=>t.currentPair&&t.currentPair[0]===0&&t.currentPair[1]===2);
      if(i<1)throw new Error('Missing closest pair trace');
      p.push(problem('pair','Closest Pair (Brute Force)','Compare squared distances','What is the squared distance from (0,0) to (1,1)?',
        ['1','2','√2','4'],s[i].distance,
        'Use (x₁−x₂)² + (y₁−y₂)². You do not need a square root for comparison.',
        'The squared distance is (0−1)²+(0−1)²=1+1=2. Brute force checks every distinct pair.',
        'The actual Euclidean distance is √2, but the question asks for its square.',s[i-1],s[i]));}
    s = trace('Bubble Sort');
    p.push(problem('count','Bubble Sort','Count a complete sort','For fixed-pass bubble sort on 5 values, how many adjacent comparisons occur across all passes?',
      ['4','5','10','25'],s[s.length-1].comparisons,
      'Count 4 comparisons in pass 1, 3 in pass 2, then 2 and 1.',
      'The total is 4+3+2+1=10=5(5−1)/2. Fixed-pass bubble sort does this even for sorted input.',
      'Do not confuse one pass with the complete algorithm.',s[0],s[s.length-1]));
    return p;
  }
  function evaluateCoins(rawAmount, rawCoins) {
    const coins = E.parseNumbers(rawCoins,12);
    if (!coins.every(c=>c>0) || new Set(coins).size!==coins.length) throw new Error('Use distinct, positive coin denominations.');
    const amount = Number(rawAmount);
    if (!/^(0|[1-9]\d*)$/.test(String(rawAmount).trim()) || !Number.isSafeInteger(amount)||amount>250) throw new Error('Enter a whole-number amount between 0 and 250.');
    const ordered=[...coins].sort((a,b)=>b-a);
    const steps=E.build("Cashier's Algorithm",{amount:String(amount),coins:ordered.join(', ')});
    const end=steps[steps.length-1].result;
    const dp=Array(amount+1).fill(Infinity),prev=Array(amount+1).fill(null);dp[0]=0;
    for(let v=1;v<=amount;v++)for(const coin of ordered){if(coin<=v&&dp[v-coin]+1<dp[v]){dp[v]=dp[v-coin]+1;prev[v]=coin;}}
    const optimum=[];let rem=amount;
    if(Number.isFinite(dp[amount])) while(rem>0){const c=prev[rem];if(!c)throw new Error('Cannot reconstruct the optimal solution');optimum.push(c);rem-=c;}
    const greedyFeasible=end.remaining===0;
    const optimalFeasible=Number.isFinite(dp[amount]);
    return {amount,coins:ordered,greedy:end.chosen,remaining:end.remaining,greedyFeasible,optimum,optimalFeasible,
      greedyOptimal:greedyFeasible&&optimalFeasible&&end.chosen.length===optimum.length,steps:steps.length};
  }
  function evaluateBinary(rawNumbers,rawTarget){
    const numbers=E.parseNumbers(rawNumbers,18);const target=Number(rawTarget);
    if(!/^[-+]?\d+$/.test(String(rawTarget).trim())||!Number.isSafeInteger(target))throw new Error('Target must be a whole number.');
    const strictlyIncreasing=numbers.every((v,i)=>i===0||v>numbers[i-1]);
    const hasDuplicates=new Set(numbers).size!==numbers.length;
    const linear=E.build('Linear Search',{numbers:numbers.join(', '),target:String(target)});
    const linearIndex=linear[linear.length-1].result;
    const sorted=[...numbers].sort((a,b)=>a-b);
    let binaryIndex=null,comparisons=null;
    if(!hasDuplicates){const trace=E.build('Binary Search',{numbers:sorted.join(', '),target:String(target)});const last=trace[trace.length-1];binaryIndex=last.result;comparisons=last.comparisons;}
    return {numbers,target,strictlyIncreasing,hasDuplicates,linearIndex,sorted,binaryIndex,comparisons};
  }
  function evaluateBubble(rawNumbers){
    const numbers=E.parseNumbers(rawNumbers,12);
    const fixedTrace=E.build('Bubble Sort',{numbers:numbers.join(', ')});
    const fixed=fixedTrace[fixedTrace.length-1],a=[...numbers];let comparisons=0,swaps=0,passes=0;
    for(let p=0;p<a.length-1;p++){
      let swapped=false;passes++;
      for(let j=0;j<a.length-p-1;j++){
        comparisons++;
        if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];swaps++;swapped=true;}
      }
      if(!swapped)break;
    }
    return {numbers,sorted:a,fixedComparisons:fixed.comparisons,fixedSwaps:fixed.swaps,earlyComparisons:comparisons,earlySwaps:swaps,passes};
  }
  window.FIELD_STUDIO={puzzles,evaluateCoins,evaluateBinary,evaluateBubble};
})();
