<?php

namespace App\Http\Controllers\UserFront;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Common;
use App\Models\User\UserItemReview;
use App\Models\User\UserItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Purifier;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('setlang');
    }

    public function reviewsubmit(Request $request)
    {
        $user_id = getUser()->id;
        $keywords = Common::get_keywords($user_id);

        // Ensure customer is authenticated
        if (!Auth::guard('customer')->check()) {
            Session::flash('error', $keywords['Customer Login required'] ?? __('Customer Login required'));
            return back();
        }

        $request->validate([
            'item_id' => ['required', 'integer'],
            'review' => ['nullable', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:5000'],
        ]);

        if ($request->review || $request->comment) {
            $customerId = Auth::guard('customer')->user()->id;

            // Verify the item belongs to this store owner
            $item = \App\Models\User\UserItem::where('id', $request->item_id)->where('user_id', $user_id)->first();
            if (!$item) {
                Session::flash('error', $keywords['Item not found'] ?? __('Item not found'));
                return back();
            }

            if (UserItemReview::where('customer_id', $customerId)->where('item_id', $request->item_id)->exists()) {
                $exists = UserItemReview::where('customer_id', $customerId)->where('item_id', $request->item_id)->first();
                if ($request->review) {
                    $exists->update([
                        'review' => (int) $request->review,
                    ]);
                    $avgreview = UserItemReview::where('item_id', $request->item_id)->avg('review');
                    \App\Models\User\UserItem::find($request->item_id)->update([
                        'rating' => $avgreview
                    ]);
                }
                if ($request->comment) {
                    $exists->update([
                        'comment' => Purifier::clean($request->comment),
                    ]);
                }
                Session::flash('success', $keywords['Updated successfully'] ?? __('Updated successfully'));
                return back();
            } else {
                $data = new UserItemReview();
                $data->create([
                    'item_id' => $request->item_id,
                    'customer_id' => $customerId,
                    'review' => $request->review ? (int) $request->review : null,
                    'comment' => $request->comment ? Purifier::clean($request->comment) : null,
                ]);
                $avgreview = UserItemReview::where('item_id', $request->item_id)->avg('review');
                \App\Models\User\UserItem::find($request->item_id)->update([
                    'rating' => $avgreview
                ]);
                Session::flash('success', $keywords['Your review has been submitted successfully'] ?? __('Your review has been submitted successfully'));
                return back();
            }
        } else {
            Session::flash('error', $keywords['Review submission was not successful. Please try again'] ?? __('Review submission was not successful. Please try again'));
            return back();
        }
    }

    public function authcheck()
    {
        if (!Auth::guard('customer')->user()) {
            Session::put('link', url()->current());
            return redirect(route('customer.login', getParam()));
        }
    }
}
